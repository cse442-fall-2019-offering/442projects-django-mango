"""
Views for Login, Logout, and getting User Email
"""

from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import DetailSerializer


@csrf_exempt
@api_view(["POST"])
def user_login(request):
    """
    POST Request: If necessary, create new user and login user
    """

    user = authenticate(identity=request.data.get("uid"))
    if user is None:
        user = User(
            identity=request.data.get("uid"),
            email=request.data.get("email"),
            name=request.data.get("displayName"),
        )
        user.set_unusable_password()
        user.save()
    login(request, user)
    CleanedToken = (
        str(Token.objects.get_or_create(user=user))
        .replace("(<Token: ", "")
        .replace(">, False)", "")
        .replace(">, True)", "")
    )
    content = {"token": CleanedToken}
    return Response(content, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def user_logout(request):
    """
    GET Request: return HTTP_200_OK if logout success
    """

    logout(request)
    return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(["GET"])
def auth(request):
    """
    GET Request: Checks if user is logged in
    """

    if request.user.is_authenticated:
        content = {"auth": True}
        return Response(content, status=status.HTTP_200_OK)
    else:
        content = {"auth": False}
        return Response(content, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def users(request):
    """
    GET Request: Gets user detail
    """

    serializer = DetailSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)
