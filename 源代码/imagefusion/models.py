from operator import mod
from statistics import mode
from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField("用户名", primary_key=True, max_length=32, null=False)
    password = models.CharField("密码", max_length=32, null=False)
    # count = models.PositiveBigIntegerField("使用次数", default=0)

    def __str__(self):
        return self.name

class Count(models.Model):
    number = models.PositiveBigIntegerField("数量", default=0)
