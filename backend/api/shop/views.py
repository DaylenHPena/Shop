from decimal import Decimal

from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.db.models import Sum
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.filters import SearchFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.shop.serializer import ProductSerializer, CartItemSerializer, CartItemCreateSerializer, AddressSerializer, \
    PaymentSerializer, OrderSerializer, OrderPlacingSerializer
from shop.models import Product, CartItem, Payment, Address, Order, OrderLine
from utils.shortcuts import get_object_or_none

def add_costumer_to_request(request):
    request.data['costumer'] = request.user.id

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ('name',)
    pagination_class = LimitOffsetPagination
    page_size = 4
    filterset_fields = ['category__name']


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    creational_serializer = CartItemCreateSerializer

    def get_queryset(self):
        return self.queryset.filter(costumer=self.request.user)

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
                "'%s' should either include a `serializer_class` attribute, "
                "or override the `get_serializer_class()` method."
                % self.__class__.__name__
        )
        assert self.creational_serializer is not None, (
                "'%s' should include a `creational_serializer` attribute. "
                "If you dont need it consider inherit from viewsets.ModelViewSet instead."
                % self.__class__.__name__
        )
        creational_actions = ['create', 'update', 'partial_update']
        return self.creational_serializer if self.action in creational_actions else self.serializer_class

    def perform_create(self, serializer):
        return serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        add_costumer_to_request(request)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        # return the instance in the retrieve serializer
        default_serialized = self.serializer_class(instance)
        headers = self.get_success_headers(serializer.data)
        return Response(default_serialized.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        data = {'deleted_id': instance.id}
        self.perform_destroy(instance)
        return Response(data=data, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        return serializer.save()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(self.serializer_class(instance).data)

    @action(methods=["POST"],detail=False)
    def empty(self, request):
        items=CartItem.objects.filter(costumer=request.user)
        items.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(('POST',))
@permission_classes([IsAuthenticated])
def add_wishlist(request, pk):
    try:
        request.user.likes.add(pk)
        return Response(status=200)
    except:
        return Response(status=200)


@api_view(('POST',))
@permission_classes([IsAuthenticated])
def remove_wishlist(request, pk):
    try:
        request.user.likes.remove(pk)
        return Response(status=200)
    except:
        return Response(status=200)


class WishlistListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.likes.all()


@api_view(('POST',))
@permission_classes([IsAuthenticated])
def shipping_address_make_default(request, pk):
    shipping_address = Address.objects.get(pk=pk)
    if shipping_address.costumer != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    active_shippind_address = get_object_or_none(
        Address, costumer=request.user, is_default=True)
    if active_shippind_address:
        active_shippind_address.is_default = False
        active_shippind_address.save()
    shipping_address.is_default = True
    shipping_address.save()
    return Response(status=status.HTTP_200_OK)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, url_path='default')
    def get_default(self, request, *args, **kwargs):
        try:
            address_pair = Address.objects.get(
                costumer=request.user, is_default=True)
            return Response(AddressSerializer(address_pair).data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_queryset(self):
        return Address.objects.filter(costumer=self.request.user)

    def create(self, request, *args, **kwargs):
        add_costumer_to_request(request)
        return super().create(request, *args, **kwargs)


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, url_path='default')
    def get_default(self, request, *args, **kwargs):
        try:
            address_pair = Payment.objects.get(
                costumer=request.user, is_default=True)
            return Response(PaymentSerializer(address_pair).data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        add_costumer_to_request(request)
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        return Payment.objects.filter(costumer=self.request.user)


class PaymentDefault(generics.UpdateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]


@api_view(('GET',))
@permission_classes([IsAuthenticated])
def retrieve_default_address(request):
    try:
        address_pair = Address.objects.get(
            costumer=request.user, is_default=True)
        return Response(AddressSerializer(address_pair).data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(('GET',))
@permission_classes([IsAuthenticated])
def retrieve_default_payment(request):
    try:
        payment_pair = Payment.objects.get(
            costumer=request.user, is_default=True)
        return Response(PaymentSerializer(payment_pair).data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


class OrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(costumer=self.request.user)
    
    

class CheckoutView(generics.CreateAPIView):
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = OrderPlacingSerializer

    def create(self, request, *args, **kwargs):
        add_costumer_to_request(request)
        request.data['total'] = 0
        return super().create(request, *args, **kwargs)

    @transaction.atomic
    def perform_create(self, serializer):
        order = serializer.save()
        try:
            # check that all orders come in correct format {id:{ammount:int}...}
            orders = self.request.data.get('order', None)
            if not orders:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            products = Product.objects.filter(
                pk__in=[int(x['product']) for x in orders])
        
            for item in orders:
                product = products.get(pk=item['product'])
                amount = int(item['quantity'])
                price=product.price * amount
                if product.inventory - amount >= 0:
                    OrderLine.objects.create(order=order, product=product,
                                             quantity=amount,
                                             price=product.price * amount)
                    product.inventory -= amount
                    product.save()
                else:
                    raise Exception('Product is not available')
            order.total = self.calculate_total(order.orderline_set.all())
            order.save()

            return Response(OrderPlacingSerializer(order).data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def calculate_total(self, queryset):
        return queryset.aggregate(sum=Sum('price')).get('sum')

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def retrieve_last_order(request):
    try:
        last_order = Order.objects.first()
        return Response(OrderSerializer(last_order).data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)