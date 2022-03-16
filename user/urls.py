from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import user_service

urlpatterns = [
    path('login/', user_service.login, name='login'),
    path('signup/', user_service.signup, name='signup'),
    path('logout/', user_service.logout, name='logout'),
]
# + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)