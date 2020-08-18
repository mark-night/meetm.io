from django.db import models
from url_or_relative_url_field.fields import URLOrRelativeURLField


class Tag(models.Model):
    tag = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.tag

    class Meta:
        abstract = True


class Category(Tag):
    pass


class Language(Tag):
    pass


class Framework(Tag):
    pass


class Tool(Tag):
    pass


class Concept(Tag):
    pass


class Project(models.Model):
    title = models.CharField(max_length=50)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name='projects')
    languages = models.ManyToManyField(
        Language, related_name='projects', blank=True)
    frameworks = models.ManyToManyField(
        Framework, related_name='projects', blank=True)
    tools = models.ManyToManyField(Tool, related_name='projects', blank=True)
    concepts = models.ManyToManyField(
        Concept, related_name='projects', blank=True)
    desc_short = models.CharField(max_length=200)
    desc_long = models.TextField()
    proj_url = URLOrRelativeURLField()
    code_url = models.URLField(max_length=300, blank=True)
    publish = models.BooleanField(default=True)

    def __str__(self):
        return self.title


def get_upload_path(instance, filename):
    return f'projects/{instance.project.id}/{filename}'


class Image(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=get_upload_path)

    def __str__(self):
        return self.image.url
