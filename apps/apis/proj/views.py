from django.http import JsonResponse
from apps.projects.models import Project, Category, Language, Framework, Tool, Concept

tagClasses = [Category, Language, Framework, Tool, Concept]
toMany_Fields = ['languages', 'frameworks', 'tools', 'concepts', 'images']


def projectList(request):
    if request.method != 'GET':
        return
    projects = []
    fieldsToFetch = ['id', 'title', 'desc_short', 'desc_long', 'proj_url', 'code_url',
                     'category', *toMany_Fields]
    for projObj in Project.objects.filter(publish=True):
        projDict = {}
        for field in fieldsToFetch:
            if field in toMany_Fields:
                projDict[field] = []
                for relatedObj in getattr(projObj, field).all():
                    if field == 'images':
                        projDict['images'].append(relatedObj.image.url)
                    else:
                        projDict[field].append(getattr(relatedObj, 'tag'))
            elif field == 'category':
                projDict['category'] = projObj.category.tag
            else:
                projDict[field] = getattr(projObj, field)
        projects.append(projDict)

    response = {'projects': projects, 'tags': {}}
    for tagClass in tagClasses:
        response['tags'][tagClass.__name__] = [
            t.tag for t in tagClass.objects.all()]

    return JsonResponse(response)


def tagList(request):
    if request.method != 'GET':
        return
    response = {}
    for tagClass in tagClasses:
        response[tagClass.__name__] = [t.tag for t in tagClass.objects.all()]
    return JsonResponse(response)
