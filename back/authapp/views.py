# auth/views.py
from rest_framework import status, views, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import User  # Import your User model (if necessary)
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            data = request.data

            firstname = data['firstname']
            lastname = data['lastname']
            phonenumber = data['phonenumber']  # This is the key from the request
            IDnumber = data['IDnumber']
            password = data['password']

            # Correcting the field name to match your model
            if len(password) >= 8:
                if not User.objects.filter(phonenumber=phonenumber).exists():
                    user = User.objects.create_user(
                        firstname=firstname,
                        lastname=lastname,
                        phonenumber=phonenumber,  # Corrected field name
                        IDnumber=IDnumber,
                        password=password,
                    )

                    user.save()

                    if User.objects.filter(phonenumber=phonenumber).exists():
                        return Response(
                            {'success': 'Account created successfully'},
                            status=status.HTTP_201_CREATED
                        )
                    else:
                        return Response(
                            {'error': 'Something went wrong when trying to create account'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR
                        )
                else:
                    return Response(
                        {'error': 'Phone number already exists'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    {'error': 'Password must be at least 8 characters in length'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except KeyError as e:
            return Response(
                {'error': f'Missing field: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': f'Something went wrong: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class LoadUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        print("user", user)
        if user:
            user = UserSerializer(user)
            return Response({"user": user.data})
        else:
            return Response({"message": "user not found"})


