from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('students', views.StudentView)
router.register('scores', views.ScoreView)

urlpatterns = [
    path('', include(router.urls)) 

    #Class 기반
    # path('students', views.StudentView.as_view())

    # 함수 기반
    # path('students/', views.StudentView),
    # path('students/<id>', views.StudentDetailView),
    # path('scores/', views.ScoreView),
    # path('scores/<id>', views.ScoreDetailView),
]

