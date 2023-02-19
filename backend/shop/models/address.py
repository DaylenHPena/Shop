import datetime
from core.settings import AUTH_USER_MODEL
from django.db import models
from utils.stamped import StampedModel


def validate_zip_code(value:str):
    return len(value) == 5

class Address(StampedModel):
    # country = models.TextChoices(['USA'])
    zip_code = models.CharField(max_length=5, validators=[validate_zip_code])
    region = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    address_line_1 = models.CharField(
        max_length=250)
    address_line_2 = models.CharField(
        max_length=250,  null=True, blank=True)
    costumer = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_default = models.BooleanField(default=False)
    inactive_date = models.DateTimeField(null=True)
    
    def __str__(self):
        return f"{self.address_line_1},{self.city},{self.region},ZIP {self.zip_code}"

    
    def delete(self, using=None, keep_parents=False):
        #a soft delete if it was asociated with an Order
        try:
            super().delete(using, keep_parents)
        except:
            self.inactive_date = datetime.datetime.now()
            self.save()


