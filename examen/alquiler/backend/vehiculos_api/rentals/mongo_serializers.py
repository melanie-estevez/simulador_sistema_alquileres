from rest_framework import serializers
class Sources:
    MOBILE = "movil"
    SYSTEM = "sistema"

    CHOICES = [
        (MOBILE, "Móvil"),
        (SYSTEM, "Sistema"),
    ]

class Action:
    CREATED = "creado"
    UPDATED = "actualizado"
    MAINTENANCE = "mantenimiento"
    DISABLED = "deshabilitado"

    CHOICES = [
        (CREATED, "Creado"),
        (UPDATED, "actualizado"),
        (MAINTENANCE, "Mantenimiento"),
        (DISABLED, "Deshabilitado"),
    ]

    
class FleetLogSerializer(serializers.Serializer):
    vehicle_id = serializers.IntegerField()
    note = serializers.CharField(max_length=120)
    source = serializers.ChoiceField(
        choices=Sources.CHOICES,
        default=Sources.MOBILE
    )
    created_at = serializers.DateTimeField(required=False)
    action = serializers.ChoiceField(
        choices=Action.CHOICES,
        default=Action.CREATED
    )
    

class EventType:
    CREATED = "creado"
    PICKED_UP = "recogido"
    RETURNED = "devuelto"
    PAID = "pagado"
    CANCELLED = "cancelado"

    CHOICES = [
        (CREATED, "Creado"),
        (PICKED_UP, "Recogido"),
        (RETURNED, "Devuelto"),
        (PAID, "Pagado"),
        (CANCELLED, "Cancelado"),
    ]
    
class Source:
    WEB = "web"
    MOBILE = "movil"
    SYSTEM = "sistema"

    CHOICES = [
        (WEB, "Web"),
        (MOBILE, "Móvil"),
        (SYSTEM, "Sistema"),
    ]

    
class RentalEventSerializer(serializers.Serializer):
    rental_id = serializers.IntegerField()
    event_type = serializers.ChoiceField(
        choices=EventType.CHOICES,
        default=EventType.CREATED
    )       
    source = serializers.ChoiceField(
        choices=Source.CHOICES,
        default=Source.WEB
    )
    note = serializers.CharField()
    created_at = serializers.DateField(required=False)
    