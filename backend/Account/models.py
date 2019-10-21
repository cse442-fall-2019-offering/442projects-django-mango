""" Custom User Model """

from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    """
    To use this custom user model:

    1)  # returns the currently active user model

        from django.contrib.auth import get_user_model
            ...
            get_user_model()

    2)  # when defining a foreign key or
        # many-to-many relations to the user model

        from django.conf import settings
            ...
            settings.AUTH_USER_MODEL

    3)  # direct import

        from Account.models import User
    """

    # identity = models.TextField(primary_key=True)
    identity = models.CharField(max_length=250, primary_key=True)
    email = models.EmailField(_("email address"), max_length=255, unique=True)
    name = models.CharField(max_length=64)
    programming_languages = models.ManyToManyField("user_group.Language", blank=True)

    USERNAME_FIELD = "identity"

    objects = UserManager()

    def __str__(self):
        return self.email
