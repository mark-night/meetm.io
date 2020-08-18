from django.contrib import admin
from .models import Project, Image, Category, Language, Tool, Framework, Concept


admin.site.register(Category)


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    # necessary for ProjectAdmin to use autocomplete_fields
    search_fields = ('tag', )


@admin.register(Framework)
class FrameworkAdmin(admin.ModelAdmin):
    search_fields = ('tag', )


@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    search_fields = ('tag', )


@admin.register(Concept)
class ConceptAdmin(admin.ModelAdmin):
    search_fields = ('tag', )


class ImageAdminInline(admin.TabularInline):
    model = Image
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'publish', 'title', 'category',
                    'desc_short', 'proj_url', 'code_url')
    list_filter = ('publish', 'category', 'languages',
                   'frameworks', 'tools', 'concepts')
    list_display_links = ('id', 'title', 'desc_short')
    list_editable = ('publish', 'category')
    search_fields = ('title', 'desc_short', 'desc_long', 'category__tag', 'languages__tag',
                     'frameworks__tag', 'tools__tag', 'concepts__tag')

    autocomplete_fields = ('languages', 'frameworks', 'tools', 'concepts')
    inlines = (ImageAdminInline, )

    list_per_page = 20
