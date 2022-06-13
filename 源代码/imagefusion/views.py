import base64
import json
import os

from django.core.handlers.wsgi import WSGIRequest
from django.http import JsonResponse
from django.shortcuts import render

from . import models

def get_test(request):
    return render(request, "test.html")


# Create your views here.
def get_login_page(request):

    return render(request, "login.html")


def get_register_page(request):

    return render(request, "register.html")


def register(request):
    come = json.loads(request.body)
    print(come)
    mans = models.User.objects.filter(name=come["name"])
    if len(mans):
        return JsonResponse({
            "status": False,
            "message": "用户名已存在",
        })
    else:
        models.User(come["name"], come["password"]).save()
        return JsonResponse({
            "status": True,
        })

def login(request):
    come = json.loads(request.body)
    mans = models.User.objects.filter(name=come["name"])
    if len(mans):
        if mans[0].password == come["password"]:
            return JsonResponse({
                "status": True,
            })
        else:
            return JsonResponse({
                "status": False,
                "message": "密码错误"
            })
    return JsonResponse({
        "status": False,
        "message": "用户不存在"
    })


def get_home(request: WSGIRequest):

    return render(request, "image_func.html")


def image_func(request):
    count: models.Count = models.Count.objects.get(id=1)
    print("=============== one request is coming")
    files: dict = json.loads(request.body)
    # 获取用户的图片并保存
    file1 = open("./static/temp/image1.jpg", "wb")
    file2 = open("./static/temp/image2.jpg", "wb")
    file1.write(base64.b64decode(bytes(files["first_image"].split("base64,")[1], "utf8")))
    file2.write(base64.b64decode(bytes(files["second_image"].split("base64,")[1], "utf8")))
    file1.close()
    file2.close()
    # 调用exe文件处理图片
    fuse = "GFFUSION.exe"
    result = os.system(fuse)
    if count.number:
        os.remove(f"./static/temp/result_image{count.number}.jpg")
        os.remove(f"./static/temp/image1{count.number}.jpg")
        os.remove(f"./static/temp/image2{count.number}.jpg")
    count.number += 1
    count.save()
    os.rename("./static/temp/result_image.jpg", f"./static/temp/result_image{count.number}.jpg")
    os.rename("./static/temp/image1.jpg", f"./static/temp/image1{count.number}.jpg")
    os.rename("./static/temp/image2.jpg", f"./static/temp/image2{count.number}.jpg")
   
    print("it's over")
    return JsonResponse({
        "status": True,
        "image1": f"/static/temp/image1{count.number}.jpg",
        "image2": f"/static/temp/image2{count.number}.jpg",
        "result_image": f"/static/temp/result_image{count.number}.jpg",
    })

