from django.urls import path, include

urlpatterns = [
    path('streams/', include('apps.apis.streams.urls')),
    path('proj/', include('apps.apis.proj.urls')),
]
