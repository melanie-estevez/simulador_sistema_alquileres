from django.urls import path
from rest_framework.routers import DefaultRouter

from manufactura.operation_logs_view import operation_logs_detail, operation_logs_list_create
from manufactura.system_events_view import system_events_detail, system_events_list_create
from .views import MachineViewSet, ProductionOrderViewSet

router = DefaultRouter()
router.register(r"machines", MachineViewSet, basename="machines")
router.register(r"production-orders", ProductionOrderViewSet, basename="production-orders")

urlpatterns = [
    path("system-events/", system_events_list_create),
    path("system-events/<str:id>/", system_events_detail),
    path("operation-logs/", operation_logs_list_create),
    path("operation-logs/<str:id>/", operation_logs_detail),
]
urlpatterns += router.urls