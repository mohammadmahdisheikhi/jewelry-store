# serializers.py
from rest_framework import serializers
from .models import Ad, AdImage


class AdImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdImage
        fields = ['id', 'image']

class AdSerializer(serializers.ModelSerializer):
    images = AdImageSerializer(many=True, read_only=True)

    class Meta:
        model = Ad
        fields = ['id', 'title', 'images', 'type', 'weight', 'carat', 'price', 'receipt_image', 'created_at']

    def create(self, validated_data):
        images_data = self.context['request'].FILES.getlist('images')
        receipt_image_data = self.context['request'].FILES.get('receipt_image')  # Get the receipt image from the request
        ad = Ad.objects.create(
            user=self.context['request'].user,
            receipt_image=receipt_image_data,
            **validated_data
        )
        for image_data in images_data:
            AdImage.objects.create(ad=ad, image=image_data)
        return ad



