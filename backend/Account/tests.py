"""
Before pushing, run 'python manage.py test'
"""

from django.contrib.auth import get_user
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class AccountTests(APITestCase):
    """
    Unit tests for Account App
    """

    def login(self):
        """
        Ensure that we can login
        """

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
        if response.status_code == status.HTTP_200_OK:
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

    def testAccount(self):
        """
        Ensure that the Account app is working correctly
        """

        self.auth()
        self.login()
        self.auth()
        self.currentUserDetail()
        self.logout()
