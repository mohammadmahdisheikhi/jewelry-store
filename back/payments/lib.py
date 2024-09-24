from django.conf import settings
from .models import Payment
import requests
import json


if settings.SANDBOX:
    sandbox = 'sandbox'
else:
    sandbox = 'www'

ZP_API_REQUEST = f"https://{sandbox}.zarinpal.com/pg/rest/WebGate/PaymentRequest.json"
ZP_API_VERIFY = f"https://{sandbox}.zarinpal.com/pg/rest/WebGate/PaymentVerification.json"
ZP_API_STARTPAY = f"https://{sandbox}.zarinpal.com/pg/StartPay/"

CallbackURL = settings.CALLBACKURL

def send_request(user, amount, description):
    data = {
        "MerchantID": settings.MERCHANT,
        "Amount": amount,
        "Description": description,
        "CallbackURL": CallbackURL,
    }
    data = json.dumps(data)
    # set content length by data
    headers = {'content-type': 'application/json', 'content-length': str(len(data)) }

    try:
        response = requests.post(ZP_API_REQUEST, data=data, headers=headers, timeout=10)

        if response.status_code == 200:
            response = response.json()
            if response['Status'] == 100:
                res = {
                    'status': True, 
                    'payment_url': ZP_API_STARTPAY + str(response['Authority']), 
                    'authority': response['Authority'], 
                    'code': 100,
                }
            else:
                res = {'status': False, 'code': str(response['Status'])}
        else:
            res = {'status': False, 'response': response }

        payment = Payment(
            user=user,
            amount=amount,
            status=Payment.WAIT,
            authority=response['Authority'],
        )
        payment.save()

        res = {'status': False, 'response': response }

        return res
    
    except requests.exceptions.Timeout:
        return {'status': False, 'code': 'timeout'}
    except requests.exceptions.ConnectionError:
        return {'status': False, 'code': 'connection error'}


def verify(authority, amount):
    data = {
        "MerchantID": settings.MERCHANT,
        "Amount": amount,
        "Authority": authority,
    }
    data = json.dumps(data)
    # set content length by data
    headers = {'content-type': 'application/json', 'content-length': str(len(data)) }
    response = requests.post(ZP_API_VERIFY, data=data, headers=headers)

    if response.status_code == 200:
        response = response.json()
        if response['Status'] == 100:
            return {'status': True, 'RefID': response['RefID']}
        else:
            return {'status': False, 'code': str(response['Status'])}
    return response
