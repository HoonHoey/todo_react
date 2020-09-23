from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers
from .models import Todo, TodoGroup, Favorite, FavoriteGroup
from django.contrib.auth import get_user_model
from django.urls import path, include

class UserSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'


class TodoSerializer(ModelSerializer):

    class Meta:
        model = Todo
        fields = '__all__' 

class TodoGroupSerializer(ModelSerializer):

    class Meta:
        model = TodoGroup
        fields = '__all__' 

class FavoriteSerializer(ModelSerializer):

    class Meta:
        model = Favorite
        fields = '__all__' 

class FavoriteGroupSerializer(ModelSerializer):

    class Meta:
        model = FavoriteGroup
        fields = '__all__' 