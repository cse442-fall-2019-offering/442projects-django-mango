from django.urls import path
from .views import (
    lang_api,
    group_api,
    group_detail,
    join_group,
    auto_join_group,
    leave_group,
    update_settings,
)


urlpatterns = [
    path("group", group_api, name="group"),
    path("group/<group_pk>", group_detail, name="group/<group_pk>"),
    path("lang", lang_api, name="lang"),
    path("join_group/<group_pk>", join_group, name="join_group/<group_pk>"),
    path("auto_join_group", auto_join_group, name="auto_join_group"),
    path("leave_group/<group_pk>", leave_group, name="leave_group/<group_pk>"),
    path("settings", update_settings, name="settings"),
]
