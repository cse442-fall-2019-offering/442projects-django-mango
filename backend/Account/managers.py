""" Model Manager for User Model """

from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    """
    Custom user model manager where identity is the unique
    identifiers for authentication instead of usernames.
    """

    use_in_migrations = True

    def create_user(self, identity, email, **extra_fields):
        """
        Create and save a User with the given identity and email.
        """

        if not identity:
            raise ValueError(_("The Identity must be set"))
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(identity=identity, email=email, **extra_fields)
        user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, identity, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given
        identity, email, and password.
        """

        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)

        return self.create_user(identity, email, password, **extra_fields)
