from django.urls import path
from . import views

urlpatterns = [
    path('View_crime/',views.View_crime,name='View_crime'),
    path('Register_crime/',views.Register_crime,name='Register_crime'),
    path('Register_Field/',views.Register_field,name='Register_field'),
    path('Admin_Login/', views.Admin_Login, name='Admin_Login'),
    path('register/', views.register),
    path('Userlogin/', views.Login_view1),
    path('logout/', views.Logout_view),
]