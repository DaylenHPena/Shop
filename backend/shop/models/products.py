from django.db import models

from core.settings import AUTH_USER_MODEL
from utils.stamped import StampedModel


class Category(StampedModel):
    name = models.CharField(max_length=100)
    parent_category = models.ForeignKey(
        'Category', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        prefix = f"{self.parent_category}>" if self.parent_category else ""
        return prefix.join(self.name)

    def __unicode__(self):
        return self.name


class Product(StampedModel):
    name = models.CharField(max_length=250)
    desc = models.TextField(max_length=500)
    sku = models.CharField(max_length=10)
    price = models.FloatField()
    inventory = models.SmallIntegerField()
    image = models.URLField()
    liked_by = models.ManyToManyField(AUTH_USER_MODEL, related_name="likes")
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.name} ${self.price}'

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.price = round(self.price, 2)
        super(Product, self).save(force_insert, force_update, using, update_fields)
