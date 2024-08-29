# authapp/auth_backends.py

from django.contrib.auth.backends import ModelBackend
from .models import User

class PhoneNumberBackend(ModelBackend):
    """
    Custom authentication backend that allows users to log in using their phone number.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(phonenumber=username)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
