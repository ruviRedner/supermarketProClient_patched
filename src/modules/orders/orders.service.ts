import { apiClient } from "../../shared/api/apiClient";

export type OrderStatus =
  | "NEW"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED";

export type Order = {
  _id: string;
  userId: string;
  items: {
    productId: string;
    nameSnapshot: string;
    priceSnapshot: number;
    qty: number;
  }[];
  total: number;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    notes?: string;
  };
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export async function createOrder(payload: {
  items: { productId: string; qty: number }[];
  customer: { fullName: string; phone: string; address: string; notes?: string };
}) {
  const res = await apiClient.post<Order>("/api/orders", payload);
  return res.data;
}

export async function getMyOrders() {
  const res = await apiClient.get<Order[]>("/api/orders/my");
  return res.data;
}

// Admin only
export async function adminGetAllOrders() {
  const res = await apiClient.get<Order[]>("/api/orders/admin/all");
  return res.data;
}

// Admin only
export async function adminUpdateStatus(payload: { id: string; status: OrderStatus }) {
  const res = await apiClient.patch<Order>(`/api/orders/admin/${payload.id}/status`, {
    status: payload.status,
  });
  return res.data;
}
