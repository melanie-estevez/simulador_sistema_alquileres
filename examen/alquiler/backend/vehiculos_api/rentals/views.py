from builtins import super

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Vehicle, Rental
from .serializers import VehicleSerializer, RentalSerializer
from .permissions import IsAdminOrReadOnly

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all().order_by("id")
    serializer_class = VehicleSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["brand", "plate"]
    ordering_fields = ["id", "brand", "plate"]

class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.select_related("vehicle").all().order_by("-id")
    serializer_class = RentalSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["vehicle"]
    search_fields = ["customer_name", "status"]
    ordering_fields = ["id", "created_at"]


    def get_permissions(self):
        # Público: SOLO listar vehículos
        if self.action == "list":
            return [AllowAny()]
        return super().get_permissions()