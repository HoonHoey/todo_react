from django.contrib import admin
from .models import Todo, TodoGroup, Favorite, FavoriteGroup

# Register your models here.

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display=['name']

@admin.register(TodoGroup)
class TodoGroupAdmin(admin.ModelAdmin):
    list_display=['name']

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display=['name']

@admin.register(FavoriteGroup)
class FavoriteGroupAdmin(admin.ModelAdmin):
    list_display=['name']