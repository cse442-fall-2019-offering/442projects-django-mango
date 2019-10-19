from django.utils.crypto import get_random_string


from .models import Group
from rest_framework import serializers


class GroupSerializer(serializers.ModelSerializer):

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
                name=validated_data.get("name"),
                identity=id,
                description=validated_data.get("description"),
            )
            group.save()
            return group

    class Meta:
        model = Group
        fields = ("identity", "name", "description")
