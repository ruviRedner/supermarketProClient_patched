import { Routes, Route, Navigate } from "react-router-dom";

import { RequireAuthLayout } from "./RequireAuthLayout";
import { AdminOnlyLayout } from "./AdminOnlyLayout";

import { Login } from "./Login";
import { Home } from "./Home";
import { ProductDetails } from "./ProductDetails";
import { Checkout } from "./Checkout";
import { OrderSuccess } from "./OrderSuccess";
import { Orders } from "./Orders";

import { Admin } from "./Admin";
import { AdminOrders } from "./AdminOrders";
import { AdminInventory } from "./AdminInventory";
import { AdminExpiryAlerts } from "./AdminExpiryAlerts";

import { useLoadMe } from "../../modules/auth/useLoadMe";
import { Register } from "./Register";
import { Products } from "./products/Products";
import { Cart } from "./cart/Cart";

export function AppRouter() {
  // IMPORTANT: after refresh we have a token, but user/role must be loaded from the server
  useLoadMe();

  return (
    <Routes>
      {/* Only public page */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Everything else requires login */}
      <Route element={<RequireAuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />

        {/* Admin routes */}
        <Route element={<AdminOnlyLayout />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/expiry" element={<AdminExpiryAlerts />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
