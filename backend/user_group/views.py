from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Language, Group
from .serializers import GroupSerializer, LangSerializer


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def lang_api(request):

    serializer = LangSerializer(Language.objects.all(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def group_api(request):
    if request.method == "GET":

        serializer = GroupSerializer(Group.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = GroupSerializer(
            data={
                "group_name": request.data.get("name"),
                "description": request.data.get("description"),
            }
        )
        if serializer.is_valid():
            serializer.save()
            group = Group.objects.get(identity=serializer.data.get("identity"))
            group.members.add(request.user)
            languages = request.data.get("languages")
            for lang in languages:

                try:
                    group.languages.add(Language.objects.get(name=lang))
                except:
                    pass
            group.save()
            serializer = GroupSerializer(group)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            data = {"error": serializer.errors}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT"])
@permission_classes((IsAuthenticated,))
def group_detail(request, group_pk):

    try:
        group = Group.objects.get(identity=group_pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = GroupSerializer(group)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == "PUT":

        languages = request.data.get("languages")
        if languages:
            group.languages.clear()
            for lang in languages:
                try:
                    group.languages.add(Language.objects.get(name=lang))
                except:
                    pass

        name = request.data.get("name")
        if name:
            group.group_name = name

        desc = request.data.get("description")
        if desc:
            group.description = desc

        group.save()

        serializer = GroupSerializer(group)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def join_group(request, group_pk):

    try:
        group = Group.objects.get(identity=group_pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if group.members.count() == 5:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    group.members.add(request.user)
    group.save()

    serializer = GroupSerializer(group)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def leave_group(request, group_pk):

    try:
        group = Group.objects.get(identity=group_pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.user not in group.members.all():
        return Response(status=status.HTTP_400_BAD_REQUEST)
    group.members.remove(request.user)
    if group.members.count() == 0:
        group.delete()
        return Response(status=status.HTTP_200_OK)
    group.save()

    serializer = GroupSerializer(group)
    return Response(serializer.data, status=status.HTTP_200_OK)
