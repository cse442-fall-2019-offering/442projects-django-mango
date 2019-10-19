#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Oct 11 06:46:58 2019

@author: csy
"""

from django.utils.crypto import get_random_string


from .models import Group, Language
from rest_framework import serializers
from Account.models import User


class LangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ("name",)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email",)


#


class GroupSerializer(serializers.ModelSerializer):
    members = UserSerializer(read_only=True, many=True)
    language = LangSerializer(read_only=True, many=True)
    identity = serializers.CharField(max_length=10, read_only=True)

    def create(self, validated_data):
        id = get_random_string(10)
        count = 0
        try:
            while count <= 20:
                Group.objects.get(identity=id)
                id = get_random_string(10)
                count += 1
        except:
            group = Group(
                group_name=validated_data.get("group_name"),
                identity=id,
                description=validated_data.get("description"),
            )
            group.save()
            return group

    class Meta:
        model = Group
        fields = ("identity", "group_name", "members", "language", "description")
