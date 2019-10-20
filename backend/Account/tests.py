"""
Before pushing, run 'python manage.py test'
"""

from django.contrib.auth import get_user
from django.core import management
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from user_group.models import Language
from .models import User


class AccountTests(APITestCase):
    """
    Unit tests for Account App
    """

    def login(self):
        """
        Ensure that we can login
        """

        management.call_command("lang")
        try:
            User.objects.get(identity="mango")
            self.assertFalse(msg="User Already Exists")
        except:
            pass
        number_of_users = User.objects.count()
        url = reverse("login")
        data = {
            "uid": "mango",
            "email": "student@buffalo.edu",
            "displayName": "Django Mango",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # User Creation
        self.assertEqual(User.objects.count(), number_of_users + 1)
        self.assertEqual(User.objects.get(identity="mango").name, "Django Mango")
        # User Authentication
        self.client.credentials(
            HTTP_AUTHORIZATION="Token " + response.data.get("token")
        )
        self.assertTrue(get_user(self.client).is_authenticated)

    def logout(self):
        """
        Ensure that we can logout
        """

        url = reverse("logout")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(get_user(self.client).is_authenticated)

    def auth(self):
        """
        Ensure that we can check if user is authenticated
        """

        url = reverse("auth")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        if response.data.get("auth"):
            self.assertTrue(get_user(self.client).is_authenticated)
        else:
            self.assertFalse(get_user(self.client).is_authenticated)

    def currentUserDetail(self):
        """
        Ensure that we can get logged in user information
        """

        url = reverse("users")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get("email"), "student@buffalo.edu")

    def updateUserDetail(self):
        """
        Ensure that we can update user information
        """

        url = reverse("users")
        data = {
            "languages": ["Python", "Java"],
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        lang1 = Language.objects.get(name="Python")
        lang2 = Language.objects.get(name="Java")
        lang3 = Language.objects.get(name="C++")
        languages = get_user(self.client).programming_languages.all()
        self.assertTrue(lang1 in languages)
        self.assertTrue(lang2 in languages)
        self.assertFalse(lang3 in languages)

    def testAccount(self):
        """
        Ensure that the Account app is working correctly
        """

        self.auth()
        self.login()
        self.auth()
        self.currentUserDetail()
        self.updateUserDetail()
        self.logout()
