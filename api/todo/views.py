from django.shortcuts import render, get_object_or_404
from rest_framework import status, viewsets
from rest_framework.views import APIView 
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated
from .models import Todo, TodoGroup, Favorite, FavoriteGroup
from .serializers import TodoSerializer, TodoGroupSerializer, FavoriteSerializer, FavoriteGroupSerializer
from rest_framework.response import Response

# Create your views here.
class TodoView(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        status = self.request.query_params.get('status')

        if status:
            qs = qs.filter(status=status) #where
        return qs

class TodoGroupView(viewsets.ModelViewSet):
    queryset = TodoGroup.objects.all()
    serializer_class = TodoGroupSerializer

class FavoriteView(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

class FavoriteGroupView(viewsets.ModelViewSet):
    queryset = FavoriteGroup.objects.all()
    serializer_class = FavoriteGroupSerializer