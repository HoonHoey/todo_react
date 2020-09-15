from django.urls import path, include
from . import views

urlpatterns = [

    #Class 기반
    # path('students', views.StudentView.as_view())

    # 함수 기반
    # path('students/', views.StudentView),
    # path('students/<id>', views.StudentDetailView),
    # path('scores/', views.ScoreView),
    # path('scores/<id>', views.ScoreDetailView),
]

