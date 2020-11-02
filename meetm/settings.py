import os
import sys

ENVS = ['SECRET_KEY', 'DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD']
ENV_MISSING = False
for key in ENVS:
    if key not in os.environ:
        print(f'{key} is needed but not set.')
        ENV_MISSING = True
if ENV_MISSING:
    sys.exit('Some environment variables are missing. Aborted.')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = ['*']
if 'DEBUG_MODE' in os.environ and os.environ['DEBUG_MODE'].lower() == 'false':
    if 'ALLOWED_HOSTS' not in os.environ:
        sys.exit('ALLOWED_HOSTS must be set in production. Aborted.')
    DEBUG = False
    ALLOWED_HOSTS = os.environ['ALLOWED_HOSTS'].split(' ')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'apps.apis.streams.apps.StreamsConfig',
    'apps.apis.proj.apps.ProjConfig',
    'apps.twitch.apps.TwitchConfig',
    # middleware for CORS headers
    # https://github.com/adamchainz/django-cors-headers
    'corsheaders',
    'url_or_relative_url_field',
    'apps.projects.apps.ProjectsConfig',
]

# > disable browsable API
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}

MIDDLEWARE = [
    'django.middleware.gzip.GZipMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ORIGIN_REGEX_WHITELIST = [
    r"^http://localhost(:\d+)?$",
    r"^http://127.0.0.1(:\d+)?$",
    r"^http://192.168.68.105(:\d+)?$",
    r"^http://markcave.local(:\d+)?$",
]

ROOT_URLCONF = 'meetm.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'meetm/templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'meetm/static')]

WSGI_APPLICATION = 'meetm.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ['DB_NAME'],
        'HOST': os.environ['DB_HOST'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASSWORD'],
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Los_Angeles'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
