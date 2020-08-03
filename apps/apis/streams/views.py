from rest_framework import generics
from .models import Stream
from .serializers import StreamSerializer


class StreamListCreate(generics.ListCreateAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer


class StreamGetUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer
    lookup_url_kwarg = 'id'
