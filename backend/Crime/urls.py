from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name='home'),
    path('state/<str:state>/', views.State_crime, name='state_crime'),
]