from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.User)
admin.site.register(models.Bookmark)
admin.site.register(models.Ad)
admin.site.register(models.AdImage)

