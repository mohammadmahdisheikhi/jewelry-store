# views.py
from django.shortcuts import get_object_or_404
from rest_framework import status, views, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Ad, AdImage
from .serializers import AdSerializer, AdImageSerializer
from authapp.models import User
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
                    AdImage.objects.create(ad=ad, image=image)
                
                return Response({'success': 'Ad created successfully'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        ads = Ad.objects.all()
        serializer = AdSerializer(ads, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class DisplayAd(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        ad = get_object_or_404(Ad, pk=kwargs['id'])  # Ensure 'id' is retrieved correctly
        serializer = AdSerializer(ad)  # Serialize the Ad instance
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class UserAdsListView(generics.ListAPIView):
    serializer_class = AdSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(f"Fetching ads for user: {user}")  # Debugging output
        return Ad.objects.filter(user=user)


class AdDetailView(generics.RetrieveDestroyAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        ad = self.get_object()
        if ad.user != request.user:
            return Response({"detail": "You do not have permission to delete this ad."}, status=status.HTTP_403_FORBIDDEN)
        
        ad.delete()
        return Response({"detail": "Ad deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
