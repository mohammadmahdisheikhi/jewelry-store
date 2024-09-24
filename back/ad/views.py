# views.py
from django.shortcuts import get_object_or_404
from rest_framework import status, views, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Ad, AdImage, Bookmark
from .serializers import AdSerializer, AdSingleGetSerializer, AdListGetSerializer, BookmarkSerializer
from authapp.models import User
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from authapp.serializers import UserSerializer

class AdCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = AdSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Automatically associate the ad with the logged-in user
                ad = Ad.objects.create(
                    user=request.user,
                    title=serializer.validated_data['title'],
                    type=serializer.validated_data['type'],
                    weight=serializer.validated_data['weight'],
                    carat=serializer.validated_data['carat'],
                    price=serializer.validated_data['price'],
                    receipt_image=request.FILES.get('receipt_image')  # Add the receipt image
                )
                
                # Handle the images separately if needed
                images = request.FILES.getlist('images')
                
                for image in images:
                    image = AdImage.objects.create(ad=ad, image=image)
                    ad.images.add(image)
                ad.save()
                
                return Response({'success': 'Ad created successfully'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        ads = Ad.objects.all().filter(
            paid=False, deleted_at__isnull=True, verified=True)
        serializer = AdListGetSerializer(ads, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AdDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, *args, **kwargs):
        try:
            # Retrieve the ad by its primary key
            ad = Ad.objects.get(pk=pk).filter(verified=True)
        except Ad.DoesNotExist:
            # If the ad doesn't exist, return a 404 response
            return Response({'detail': 'Ad not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Mark the ad as deleted by setting the deleted_at field to the current timestamp
        ad.deleted_at = timezone.now()
        ad.save()

        return Response({'detail': 'Ad deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


class DisplayAd(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        ad = get_object_or_404(Ad, pk=kwargs['id'])  # Ensure 'id' is retrieved correctly
        serializer = AdSingleGetSerializer(ad)  # Serialize the Ad instance
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class UserAdsListView(generics.ListAPIView):
    serializer_class = AdSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Ad.objects.filter(user=user, verified=True)


class AddBookmark(APIView):
    permission_classes = [IsAuthenticated]  # Ensures only authenticated users can access this view

    def post(self, request, pk, *args, **kwargs):
        user = request.user
        # Fetch the ad object or return 404 if not found
        ad = get_object_or_404(Ad, pk=pk)

        # Create a bookmark for the authenticated user and the specified ad
        bookmark = Bookmark(user=user, ad=ad)
        bookmark.save()

        return Response({'detail': 'Bookmark added successfully.'}, status=status.HTTP_201_CREATED)
    

    
class GetBookmarks(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        user = request.user
        # Retrieve all bookmarks for the authenticated user
        bookmarks = Bookmark.objects.filter(user=user)
        serializer = BookmarkSerializer(bookmarks, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)