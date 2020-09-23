from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('todo', views.TodoView)
router.register('todogroup', views.TodoGroupView)
router.register('favorite', views.FavoriteView)
router.register('favoritegroup', views.FavoriteGroupView)


urlpatterns = [
    path('', include(router.urls))
]