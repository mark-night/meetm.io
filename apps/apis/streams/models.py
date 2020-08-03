from django.db import models


class Stream(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    userId = models.CharField(max_length=50)
