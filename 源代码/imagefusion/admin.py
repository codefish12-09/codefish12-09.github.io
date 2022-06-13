from django.contrib import admin
from . import models


# Register your models here.
@admin.register(models.User)
class UserRegister(admin.ModelAdmin):
    pass