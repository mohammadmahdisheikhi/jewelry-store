from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Payment(models.Model):
    WAIT = "Wait"
    NOK = "NOK"
    FAILED = "Failed"
    SUCCESS = "Successful"

    STATUS_CHOICES = [
        (WAIT, WAIT),
        (NOK, NOK),
        (FAILED, FAILED),
        (SUCCESS, SUCCESS),
    ]

    user = models.ForeignKey(User, related_name="payment_user", on_delete=models.CASCADE)
    amount = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=WAIT)
    authority = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
