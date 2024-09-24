# models.py
from django.db import models
from authapp.models import User

class Ad(models.Model):
    verified = models.BooleanField(default=False)
    user = models.ForeignKey(User, related_name='ads', on_delete=models.CASCADE)  # Relate Ad to User
    title = models.CharField(max_length=255)
    images = models.ManyToManyField('AdImage', related_name='ads')  # Relation to AdImage model for storing multiple images
    type = models.CharField(max_length=100)
    weight = models.CharField(max_length=50)
    carat = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    receipt_image = models.ImageField(upload_to='ads/receipts/', blank=True, null=True)  # Add a new field for the receipt image
    created_at = models.DateTimeField(auto_now_add=True)

    deleted_at = models.DateTimeField(blank=True, null=True, default=None)

    paid = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.title

class AdImage(models.Model):
    image = models.ImageField(upload_to='ads/images/')
    ad = models.ForeignKey(Ad, related_name='ad_images', on_delete=models.CASCADE)  # Provide a unique related_name

    def __str__(self):
        return f"Image for {self.ad.title}"


class Bookmark(models.Model):
    user = models.ForeignKey(User, related_name="user_bookmark", on_delete=models.CASCADE)
    ad = models.ForeignKey(Ad, related_name="user_bookmark", on_delete=models.CASCADE)