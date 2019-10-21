from django.contrib.auth.backends import ModelBackend

from .models import User


class PasswordlessAuthBackend(ModelBackend):
    """Log in to Django without providing a password."""

    def authenticate(self, identity=None):
        try:
            return User.objects.get(identity=identity)
        except User.DoesNotExist:
            return None

    def get_user(self, identity):
        try:
            return User.objects.get(identity=identity)
        except User.DoesNotExist:
            return None
