# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('create', views.AdCreateView.as_view(), name='ad-create'),
    path('ads', views.AdListView.as_view(), name='ad-list'),
    path("ad/<int:id>/", views.DisplayAd.as_view(), name='display-ad'),
    path('myads', views.UserAdsListView.as_view(), name='my-ads'),
    path('delete/<int:pk>/', views.AdDeleteView.as_view(), name='ad-delete'),
    path('add_bookmark/<int:pk>/', views.AddBookmark.as_view(), name='add-bookmark'),
    path('bookmarks/', views.GetBookmarks.as_view(), name='get-bookmarks'),
    
]
