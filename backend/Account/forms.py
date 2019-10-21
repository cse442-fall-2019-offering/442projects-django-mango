""" Enables Creation and Modification of User Models"""

from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import User


class UserCreationForm(UserCreationForm):
    """
    Subclasses the UserCreationForm to use the
    User model
    """

    class Meta(UserCreationForm):
        model = User
        fields = ("identity", "email")


class UserChangeForm(UserChangeForm):
    """
    Subclasses the UserChangeForm to use the
    User model
    """

    class Meta:
        model = User
        fields = ("email",)
