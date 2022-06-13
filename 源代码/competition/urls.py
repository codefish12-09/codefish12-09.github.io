"""competition URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from imagefusion.views import *

urlpatterns = [
    path("test", get_test),
    path('admin/', admin.site.urls),
    path("loginPage", get_login_page),
    path("register", get_register_page),
    path("putRegister", register),
    path("login", login),
    path("home", get_home),
    path("imageFunc", image_func),
    
    path("", get_login_page),
]
