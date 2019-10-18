""" User Serializers"""

from rest_framework import serializers

from .models import User, ProgrammingLanguage


class ProgrammingLanguageSerializer(serializers.ModelSerializer):
    """
    Used for getting programming languages
    """

    class Meta:
        model = ProgrammingLanguage
        fields = ("name",)


class DetailSerializer(serializers.ModelSerializer):
    """
    Used for getting user accounts
    """

    programming_languages = ProgrammingLanguageSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ("email", "name", "programming_languages")
