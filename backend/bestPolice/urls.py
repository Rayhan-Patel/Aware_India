# urls.py
from django.urls import path
from .views import search_police_stations

urlpatterns = [
    path('police-stations/', search_police_stations, name='search_police_stations'),
]
