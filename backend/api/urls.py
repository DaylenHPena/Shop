from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from api.shop.views import ProductViewSet, CartItemViewSet, add_wishlist, remove_wishlist, WishlistListView, \
    PaymentViewSet, AddressViewSet, CheckoutView, OrderListView, retrieve_last_order
from api.users.views import *
from jwt_auth.views import MyTokenObtainPairView

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'cart-item', CartItemViewSet)
router.register(r'payment', PaymentViewSet)
router.register(r'address', AddressViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    path('users/<int:pk>/', RetrieveUser.as_view(), name='user_detail'),
    path('users/register/', RegistrationView.as_view(), name='user_register'),
    path('wishlist/', WishlistListView.as_view(), name='wishlist'),
    path('wishlist/add/<int:pk>/', add_wishlist, name='wishlist_add'),
    path('wishlist/remove/<int:pk>/', remove_wishlist, name='wishlist_remove'),
    path('checkout/', CheckoutView.as_view(), name='order_create'),
    path('order/', OrderListView.as_view(), name='order_list'),
    path('order/last/', retrieve_last_order, name='order_last'),
    path('profile/', retrieve_profile, name="profile"),

]
