from django.urls import path
from rest_framework.routers import DefaultRouter
from .fleet_logs_views import fleet_logs_list_create, fleet_logs_detail
from .rental_events_views import rental_events_detail, rental_events_list_create
from .views import VehicleViewSet, RentalViewSet

router = DefaultRouter()
router.register(r"vehiculos", VehicleViewSet, basename="vehiculos")
router.register(r"alquileres", RentalViewSet, basename="alquileres")

urlpatterns = [
    path("fleet-logs/", fleet_logs_list_create),
    path("fleet-logs/<str:id>/", fleet_logs_detail),
    path("rental-events/", rental_events_list_create),
    path("rental-events/<str:id>/", rental_events_detail),
]
urlpatterns += router.urls