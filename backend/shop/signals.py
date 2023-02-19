from django.db.models.signals import post_save
from django.dispatch import receiver

from shop.models import Address, Payment


@receiver(post_save, sender=Address)
def make_unique_default(sender, instance: Address,**kwargs):
    if instance.is_default:
        Address.objects.filter(costumer=instance.costumer).exclude(pk=instance.pk).update(is_default=False)


@receiver(post_save, sender=Payment)
def make_unique_default(sender, instance: Payment,**kwargs):
    if instance.is_default:
        Payment.objects.filter(costumer=instance.costumer).exclude(pk=instance.pk).update(is_default=False)