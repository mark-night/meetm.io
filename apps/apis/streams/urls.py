from django.urls import path
from . import views

urlpatterns = [
    path('', views.StreamListCreate.as_view()),
    path('<int:id>/', views.StreamGetUpdateDelete.as_view()),
]
