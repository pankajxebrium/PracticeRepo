from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^power-play/$', views.power_play, name="power_play"),
]
