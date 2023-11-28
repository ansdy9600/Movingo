from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('get_user/', views.get_user),
    path('<username>/', views.profile),
    path('<username>/follow/', views.follow),
] 