from django.db import models
from django.urls import reverse
from Account.models import User


class Language(models.Model):

    name = models.CharField(max_length=50, primary_key=True)

    search_popularity = models.DecimalField(max_digits=10, decimal_places=5)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return "{}".format(self.name)


class Group(models.Model):

    name = models.CharField(max_length=250)
    identity = models.CharField(max_length=10, primary_key=True)
    languages = models.ManyToManyField(Language)
    members = models.ManyToManyField(User)
    description = models.TextField()
    contact = models.TextField()
    public = models.BooleanField(default=False)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return "{}".format(self.name)
