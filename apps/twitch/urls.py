from django.urls import re_path
from . import views

urlpatterns = [
    # let react app take over routing
    re_path(r'.*', views.index)
]
