from django.db import models
from url_or_relative_url_field.fields import URLOrRelativeURLField


class Tag(models.Model):
    tag = models.CharField(max_length=20)

    def __str__(self):
        return self.tag


class Category(models.Model):
    category = models.CharField(max_length=20)

    def __str__(self):
        return self.category


class Project(models.Model):
    title = models.CharField(max_length=50)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name='projects')
    tags = models.ManyToManyField(Tag, related_name='projects')
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
