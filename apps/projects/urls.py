from apps.twitch.urls import urlpatterns
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index)
]
