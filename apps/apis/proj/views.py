from django.http import JsonResponse
from apps.projects.models import Project, Category, Tag


def projectList(request):
    if request.method != 'GET':
        return
    projects = []
    fields = ['id', 'title', 'category', 'tags', 'images',
              'desc_short', 'desc_long', 'proj_url', 'code_url']
    for p in Project.objects.filter(publish=True):
        proj = {}
        for field in fields:
            if field == 'tags':
                proj['tags'] = []
                for obj in p.tags.all():
                    proj['tags'].append(obj.tag)
            elif field == 'images':
                proj['images'] = []
                for obj in p.images.all():
                    proj['images'].append(obj.image.url)
            elif field == 'category':
                proj['category'] = p.category.category
            else:
                proj[field] = getattr(p, field)
        projects.append(proj)

    return JsonResponse(projects, safe=False)


def tagList(request):
    if request.method != 'GET':
        return
    return JsonResponse([t.tag for t in Tag.objects.all()], safe=False)


def categoryList(request):
    if request.method != 'GET':
        return
    return JsonResponse([c.category for c in Category.objects.all()], safe=False)
