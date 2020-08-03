from django.urls import path, include

urlpatterns = [
    path('streams/', include('apps.apis.streams.urls')),
]
