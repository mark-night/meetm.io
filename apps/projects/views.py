from django.shortcuts import render


def index(request):
    return render(request, 'projects/index.html')


def sw(request):
    response = render(request, 'projects/sw-proj.js')
    response['Content-Type'] = 'application/javascript'
    # magic to allow service worker expand its scope to upper level
    # https://w3c.github.io/ServiceWorker/#service-worker-script-response
    response['Service-Worker-Allowed'] = '/'
    return response
