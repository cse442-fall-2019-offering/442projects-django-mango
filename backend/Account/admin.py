""" Admin View of User Database"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserCreationForm, UserChangeForm
from .models import User


class UserAdmin(UserAdmin):
    """
    Superusers can view User Database
    """

    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    list_display = ("identity", "email", "name")
    list_filter = ("identity", "email", "name")
    fieldsets = (
        (None, {"fields": ("identity", "email", "name", "programming_languages")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("identity", "email", "name", "programming_languages"),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)


admin.site.register(User, UserAdmin)
