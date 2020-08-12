from django.urls import path
from . import views

urlpatterns = [
    path('category/', views.categoryList),
    path('tag/', views.tagList),
    path('', views.projectList),
]
