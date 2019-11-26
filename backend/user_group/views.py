from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Language, Group
from .serializers import GroupSerializer

from .sort import sort_group


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def lang_api(request):

    languages = []
    for language in Language.objects.all():
        languages.append(language.name)
    return Response(languages, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def group_api(request):

    if request.method == "GET":
        groupList = []
        for group in Group.objects.filter(public=True):
            if request.user not in group.members.all():
                members = []
                for member in group.members.all():
                    members.append(member.name)
                languages = []
                for language in group.languages.all():
                    languages.append(language.name)
                groupList.append([group.identity, group.name, languages, members])
        languages = []
        for language in request.user.programming_languages.all():
            languages.append(language.name)
        groupList = sort_group(groupList, languages)  # Sort Group
        return Response(groupList, status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = GroupSerializer(
            data={
                "name": request.data.get("name"),
                "description": request.data.get("description"),
                "contact": request.data.get("contact"),
                "public": request.data.get("public"),
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
            members = []
            for member in group.members.all():
                members.append(member.name)
            languages = []
            for language in group.languages.all():
                languages.append(language.name)
            content = {
                "identity": group.identity,
                "name": group.name,
                "members": members,
                "languages": languages,
                "description": group.description,
                "contact": group.contact,
                "public": group.public,
                "member": True,
            }
            return Response(content, status=status.HTTP_200_OK)
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
        group_members = group.members.all()
        is_member = request.user in group_members
        if not group.public:
            if not is_member:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        members = []
        for member in group_members:
            members.append(member.name)
        languages = []
        for language in group.languages.all():
            languages.append(language.name)
        content = {
            "name": group.name,
            "members": members,
            "languages": languages,
            "description": group.description,
            "member": is_member,
            "contact": group.contact,
            "public": group.public,
        }
        return Response(content, status=status.HTTP_200_OK)
    if request.method == "PUT":
        if request.user in group.members.all():
            languages = request.data.get("languages")
            if languages:
                group.languages.clear()
                for lang in languages:
                    try:
                        group.languages.add(Language.objects.get(name=lang))
                    except:
                        pass
            if "description" in request.data:
                desc = request.data.get("description")
                group.description = desc
            if "contact" in request.data:
                contact = request.data.get("contact")
                group.contact = contact
            if "public" in request.data:
                public = request.data.get("public")
                group.public = public
            group.save()
            members = []
            for member in group.members.all():
                members.append(member.name)
            languages = []
            for language in group.languages.all():
                languages.append(language.name)
            content = {
                "name": group.name,
                "members": members,
                "languages": languages,
                "description": group.description,
                "contact": group.contact,
                "public": group.public,
                "member": True,
            }
            return Response(content, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


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
    members = []
    for member in group.members.all():
        members.append(member.name)
    languages = []
    for language in group.languages.all():
        languages.append(language.name)
    content = {
        "name": group.name,
        "members": members,
        "languages": languages,
        "description": group.description,
        "contact": group.contact,
        "public": group.public,
        "member": True,
    }
    return Response(content, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def auto_join_group(request):

    groupList = []
    for group in Group.objects.filter(public=True):
        if request.user not in group.members.all():
            members = []
            for member in group.members.all():
                members.append(member.name)
            languages = []
            for language in group.languages.all():
                languages.append(language.name)
            groupList.append([group.identity, group.name, languages, members])
    languages = []
    for language in request.user.programming_languages:
        languages.append(language.name)
    groupList = sort_group(groupList, languages)  # Sort Group
    try:
        group = Group.objects.get(identity=groupList[0][0])
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if group.members.count() == 5:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    group.members.add(request.user)
    group.save()
    members = []
    for member in group.members.all():
        members.append(member.name)
    languages = []
    for language in group.languages.all():
        languages.append(language.name)
    content = {
        "identity": group.identity,
        "name": group.name,
        "members": members,
        "languages": languages,
        "description": group.description,
        "contact": group.contact,
        "public": group.public,
        "member": True,
    }
    return Response(content, status=status.HTTP_200_OK)


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
        content = {"deleted": True}
        return Response(content, status=status.HTTP_200_OK)
    group.save()
    members = []
    for member in group.members.all():
        members.append(member.name)
    languages = []
    for language in group.languages.all():
        languages.append(language.name)
    content = {
        "name": group.name,
        "members": members,
        "languages": languages,
        "description": group.description,
        "contact": group.contact,
        "public": group.public,
        "member": False,
    }
    content = {"deleted": False, "data": content}
    return Response(content, status=status.HTTP_200_OK)
