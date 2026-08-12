from rest_framework import serializers

class EventTypeSerializer(serializers.Serializer):
    event_type = serializers.CharField(max_length=120)
    source = serializers.CharField(required=False, allow_blank=True)
    details = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField(required=False)

class OperationLogSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()        # ID de Vehiculo (Postgres)
    level = serializers.CharField()   
    message = serializers.CharField(required=False, allow_blank=True)
    machine_id = serializers.IntegerField(required=False)
    created_at = serializers.DateTimeField(required=False)
    