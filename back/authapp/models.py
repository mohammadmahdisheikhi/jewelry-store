from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, phonenumber, firstname, lastname, IDnumber, password):
        if not phonenumber:
            raise ValueError('The Phone Number field is required')
        if not firstname:
            raise ValueError('The First Name field is required')
        if not lastname:
            raise ValueError('The Last Name field is required')
        if not IDnumber:
            raise ValueError('The ID Number field is required')

        # Create a user instance with the provided fields
        user = self.model(
            phonenumber=phonenumber,
            firstname=firstname,
            lastname=lastname,
            IDnumber=IDnumber,
        )
        
        # Set the password (hashed)
        user.set_password(password)
        # Save the user object to the database
        user.save(using=self._db)
        return user

    def create_superuser(self, phonenumber, firstname, lastname, IDnumber, password):
        # Call create_user with the same arguments
        user = self.create_user(
            phonenumber=phonenumber,
            firstname=firstname,
            lastname=lastname,
            IDnumber=IDnumber,
            password=password,
        )
        # Set superuser-specific fields
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    firstname = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    phonenumber = models.CharField(max_length=15, unique=True)
    IDnumber = models.CharField(max_length=20, unique=True)  # Custom ID field
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    city = models.CharField(max_length=30, blank=True, null=True, default=None)
    address = models.TextField(blank=True, null=True, default=None)
    shaba = models.CharField(max_length=30, blank=True, null=True, default=None)
    postal_code = models.CharField(max_length=30, blank=True, null=True, default=None)

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    USERNAME_FIELD = 'phonenumber'
    REQUIRED_FIELDS = ['firstname', 'lastname', 'IDnumber']

    # Attach the custom user manager
    objects = CustomUserManager()

    def __str__(self):
        return self.phonenumber
