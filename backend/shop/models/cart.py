from django.db import models

from core.settings import AUTH_USER_MODEL
from shop.models.products import Product
from utils.stamped import StampedModel


class CartItem(StampedModel):
    quantity = models.SmallIntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    costumer = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.product} QTY:{self.quantity}'
