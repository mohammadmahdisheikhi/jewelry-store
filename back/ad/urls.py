# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('create', views.AdCreateView.as_view(), name='ad-create'),
    path('ads', views.AdListView.as_view(), name='ad-list'),
    path("ad/<int:id>/", views.DisplayAd.as_view(), name='display-ad'),
    path('myads', views.UserAdsListView.as_view(), name='my-ads'),
    path('delete/<int:pk>/', views.AdDetailView.as_view(), name='ad-detail'),

]
