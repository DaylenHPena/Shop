from django.db import models

from core.settings import AUTH_USER_MODEL
from shop.models import Address, Product
from utils.stamped import StampedModel


class Status(models.TextChoices):
    CREATED = "C"
    SHIPPED = "S"
    DELIVERED = "D"
    FULLFILLED = "F"


STATUS_TO_STRING = {Status.CREATED: "Processing", Status.SHIPPED: "Shipped", Status.DELIVERED: "Delivered",
          Status.FULLFILLED: "Fullfiled"}


class Order(StampedModel):
    from shop.models import Payment
    costumer = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.PROTECT)
    shipping_address = models.ForeignKey(
        Address, on_delete=models.PROTECT)
    payment_method = models.ForeignKey(Payment, on_delete=models.PROTECT)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=1, choices=Status.choices, default=Status.CREATED)
    total = models.FloatField()

    class Meta:
        ordering = ['-date']

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.total = round(self.total, 2)
        super().save(force_insert, force_update, using, update_fields)

    def status_to_string(self):
        try:
            return STATUS_TO_STRING[self.status]
        except: return "Unknown"


class OrderLine(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.SmallIntegerField()
    price = models.FloatField()

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.price = round(self.price, 2)
        super().save(force_insert, force_update, using, update_fields)
