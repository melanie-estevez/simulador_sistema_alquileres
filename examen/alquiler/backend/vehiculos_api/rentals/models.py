from django.db import models

class Vehicle(models.Model):
    plate = models.CharField(max_length=10, unique=True)
    brand = models.CharField(max_length=40)
    daily_rate = models.DecimalField(
        max_digits=10,  # total de dígitos
        decimal_places=2,  # decimales
        default=0
    )
    is_available = models.BooleanField(default=True)
    def __str__(self):
        return self.plate
    
class Status(models.TextChoices):
        RESERVED = "reservado", "Reservado"
        ACTIVE = "activo", "Activo"
        CLOSED = "completado", "Completado"
        CANCELLED = "cancelado", "Cancelado"
        
class Rental(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT, related_name="rentals")
    customer_name = models.CharField(max_length=120)
    total = models.DecimalField(
        max_digits=10,  # total de dígitos
        decimal_places=2,  # decimales
        default=0
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ACTIVE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.vehicle.brand} {self.vehicle.plate} ({self.customer_name})"