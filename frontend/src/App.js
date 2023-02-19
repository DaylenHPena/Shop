import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import { Provider } from "react-redux";
import store from "./app/store";
import RegistrationPage from "./pages/RegistrationPage";
import IndexPage from "./pages/IndexPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import { LINKS } from "./const";
import OrderFinishedPage from "./pages/OrderFinishedPage";
import { ErrorBoundary } from "./components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <ErrorBoundary>
          <Routes>
            <Route path="/sale" element={<ProductListPage />} />
            <Route exact path="/" element={<IndexPage />} />
            <Route path="/wishlist/" element={<WishlistPage />} />
            <Route exact path="product/:id/" element={<ProductDetailPage />} />
            <Route path="cart/" element={<CartPage />} />
            <Route path="login/" element={<LoginPage />} />
            <Route path="registration/" element={<RegistrationPage />} />
            <Route path="profile/" element={<ProfilePage />} />
            <Route path={LINKS.CHECKOUT} element={<CheckoutPage />} />
            <Route path="last-order/" element={<OrderFinishedPage />} />
          </Routes>
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
