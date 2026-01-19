/**
 * DEPRECATED (server-backed orders):
 * The app now loads orders from the Node.js server via /api/orders.
 * Kept only to avoid breaking imports if you still reference it somewhere.
 *
 * Prefer: src/modules/orders/orders.service.ts
 */
import { create } from "zustand";

type OrdersState = {
  // local fallback (not used)
  orders: never[];
};

export const useOrdersStore = create<OrdersState>(() => ({
  orders: [],
}));
