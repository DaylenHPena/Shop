from django.contrib.auth.models import AnonymousUser
from rest_framework import serializers

from shop.models import Product, CartItem, Address, Payment, Category, Order, OrderLine


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        liked_by = instance.liked_by.all()
        data['liked_by'] = liked_by.count()
        print('self.context',self.context)
        if not isinstance(self.context['request'].user, AnonymousUser):
            data['wished'] = liked_by.filter(
                pk=self.context['request'].user.id).count() > 0
        else:
            data['wished'] = False
        return data

class ProductOrderSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        liked_by = instance.liked_by.all()
        data['liked_by'] = liked_by.count()
        return data

class ProductInCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image','inventory']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductInCartSerializer()

    class Meta:
        model = CartItem
        fields = '__all__'


class CartItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class OrderLineSerializer(serializers.ModelSerializer):
    product=ProductOrderSerializer()
    class Meta:
        model = OrderLine
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    products=OrderLineSerializer(many=True, read_only=True,source='orderline_set')
    shipping_address = AddressSerializer()

    class Meta:
        model = Order
        fields = ['date','status','total','products','shipping_address']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['status_string'] = instance.status_to_string()
        return data

class OrderPlacingSerializer(serializers.ModelSerializer):
    products = OrderLineSerializer(many=True, read_only=True, source='orderline_set')
    class Meta:
        model = Order
        fields='__all__'



