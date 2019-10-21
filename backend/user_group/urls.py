from django.urls import path
from .views import lang_api, group_api, group_detail, join_group, leave_group


urlpatterns = [
    path("group", group_api, name="group"),
    path("group/<group_pk>", group_detail, name="group/<group_pk>"),
    path("lang", lang_api, name="lang"),
    path("join_group/<group_pk>", join_group, name="join_group/<group_pk>"),
    path("leave_group/<group_pk>", leave_group, name="leave_group/<group_pk>"),
]
