import { create } from "zustand";
import type { Product } from "../products/productsApi";
import { persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  clear: () => void;
  inc: (productId: string) => void;
  dec: (productId: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product._id === product._id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product._id === product._id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { product, qty: 1 }] };
        }),
      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product._id !== productId),
        })),
      clear: () => set({ items: [] }),
      inc: (productId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product._id === productId ? { ...i, qty: i.qty + 1 } : i
          ),
        })),
      dec: (productId) =>
        set((state) => {
          const next = state.items
            .map((i) =>
              i.product._id === productId ? { ...i, qty: i.qty - 1 } : i
            )
            .filter((i) => i.qty > 0);
          return { items: next };
        }),
    }),
    { name: "supermarketpro-cart" }
  )
);

export function useCartTotalPrice() {
  return useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  );
}

export function useCartTotalQty() {
  return useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.qty, 0)
  );
}