from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('twitch/', include('apps.twitch.urls')),
    path('api/', include('apps.apis.urls')),
    path('admin/', admin.site.urls),
    path('proj/', include('apps.projects.urls')),
    path('', views.index),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
