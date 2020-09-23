from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class TodoGroup(models.Model):
    seq = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    reg_date = models.DateField(auto_now_add=True)
    del_yn = models.BooleanField(default=False) 


class Todo(models.Model):
    seq = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    status = models.CharField(max_length=10)
    reg_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(blank=True)
    del_yn = models.BooleanField(default=False)
    group = models.ForeignKey(TodoGroup, on_delete=models.CASCADE)


class FavoriteGroup(models.Model):
    seq = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    reg_date = models.DateField(auto_now_add=True)

class Favorite(models.Model):
    seq = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    url = models.CharField(max_length=100)
    memo = models.TextField()
    reg_date = models.DateField(auto_now_add=True)
    group = models.ForeignKey(FavoriteGroup, on_delete=models.CASCADE)

