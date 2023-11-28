from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    profileurl = models.CharField(max_length=200)
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')