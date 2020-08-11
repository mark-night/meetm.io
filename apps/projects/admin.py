from django.contrib import admin
from .models import Project, Category, Image, Tag


admin.site.register(Category)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    # necessary for ProjectAdmin to use autocomplete_fields
    search_fields = ('tag', )


class ImageAdminInline(admin.TabularInline):
    model = Image
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'publish', 'title', 'category', 'desc_short')
    list_filter = ('publish', 'category', 'tags')
    list_display_links = ('id', 'title', 'desc_short')
    list_editable = ('publish', 'category')
    search_fields = ('title', 'desc_short', 'desc_long', 'tags__tag')

    autocomplete_fields = ('tags', )
    inlines = (ImageAdminInline, )

    list_per_page = 20
