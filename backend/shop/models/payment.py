from django.db import models
from django.db.models import QuerySet

from core.settings import AUTH_USER_MODEL
from utils.stamped import StampedModel
import datetime


def validate_numbers(value: str):
    def func(x): return x.isalpha()
    return not any(map(func, value))


def validate_lenght(value):
    length = len(value)
    return 12 <= length <= 16


'''class PaymentManager(models.Manager):
    def get_queryset(self):
        return  super().get_queryset().filter(inactive_date__is_null=True)'''


class Payment(StampedModel):
    owner = models.CharField(max_length=250)
    account_number = models.CharField(max_length=16, validators=[
                                      validate_lenght, validate_numbers])
    expiry_date = models.DateTimeField()
    costumer = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_default = models.BooleanField(default=False)
    inactive_date = models.DateTimeField(null=True)

    # objects=PaymentManager()

    def delete(self, using=None, keep_parents=False):
        #a soft delete if it was asociated with an Order
        try:
            super(Payment, self).delete(using, keep_parents)
        except:
            self.inactive_date = datetime.datetime.now()
            self.save()
