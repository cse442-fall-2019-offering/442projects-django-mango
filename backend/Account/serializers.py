""" User Serializers"""

from rest_framework import serializers

from .models import User

from user_group.serializers import LangSerializer


class DetailSerializer(serializers.ModelSerializer):
    """
    Used for getting user accounts
    """

    programming_languages = LangSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ("email", "name", "programming_languages")
