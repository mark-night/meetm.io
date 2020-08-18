from django.urls import path
from . import views

urlpatterns = [
    path('tag/', views.tagList),
    path('', views.projectList),
]
