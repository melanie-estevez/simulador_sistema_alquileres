from rest_framework import serializers
from .models import Vehicle, Rental

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ["id", "plate", "brand", "daily_rate", "is_available"]

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ["id", "vehicle", "customer_name", "total", "status", "created_at"]