import {
  axiosDelete,
  axiosGet,
  axiosPost,
  axiosPut,
  axiosPatch,
} from "../lib/AxiosConfig";

export default {
  //Users
  async retrieveUser(id) {
    return axiosGet(`users/${id}/`);
  },

  async retrieveProfile() {
    return axiosGet(`profile/`);
  },

  async registerUser(data) {
    return axiosPost(`users/register/`, data);
  },

  //Products
  async retrieveDetails(id) {
    return axiosGet(`products/${id}/`);
  },

  async retrieveList(queryparams) {
    let url = `products/`;
    if (queryparams) {
      url += `${queryparams}`;
    }
    return axiosGet(url);
  },

  //Wishlist
  async retrieveWishlist() {
    return axiosGet("wishlist/");
  },
  async addWishlist(itemId) {
    return axiosPost(`wishlist/add/${itemId}/`);
  },
  async removeWishlist(itemId) {
    return axiosPost(`wishlist/remove/${itemId}/`);
  },

  //Cart
  async retrieveCart() {
    return axiosGet("cart-item/");
  },
  async addToCart(product, quantity) {
    const data = {
      quantity: quantity,
      product: product,
      session: 1,
    };
    return axiosPost("cart-item/", data);
  },
  async updateCartItem(id, quantity) {
    const data = {
      quantity: quantity,
    };
    return axiosPatch(`cart-item/${id}/`, data);
  },
  async removeFromCart(id) {
    return axiosDelete(`cart-item/${id}/`);
  },
  async emptyCart() {
    console.log('call empty cart :>> ');
    return axiosPost(`cart-item/empty/`);
  },

  //PAYMENT
  async listPaymentMethods() {
    return axiosGet("payment/");
  },
  async createPaymentMethods(data) {
    return axiosPost("payment/", data);
  },
  async retrievePaymentMethods(id) {
    return axiosGet(`payment/${id}/`);
  },
  async retrievePaymentDefault() {
    return axiosGet("payment/default/");
  },
  async deletePayment(id) {
    return axiosDelete(`payment/${id}/`);
  },

  //ADDRESSES
  async retrieveAddress(id) {
    return axiosGet(`address/${id}/`);
  },
  async listAddresses() {
    return axiosGet("address/");
  },
  async createAddress(data) {
    return axiosPost("address/", data);
  },
  async deleteAddress(id) {
    return axiosDelete(`address/${id}/`);
  },
  async retrieveAddressDefault() {
    return axiosGet("address/default/");
  },

  //ORDERS
  async retrieveOrder(id) {
    return axiosGet(`order/${id}/`);
  },
  async retrieveLastOrder() {
    return axiosGet(`order/last/`);
  },
  async listOrder() {
    return axiosGet("order/");
  },
  async createOrder(data) {
    return axiosPost("checkout/", data);
  },
};
