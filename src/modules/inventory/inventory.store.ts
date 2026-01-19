/**
 * DEPRECATED (server-backed products):
 * Inventory is now loaded from the server (/api/products).
 * This store was used only for mock/local inventory editing.
 *
 * Prefer: src/modules/products/productsApi.ts
 */
import { create } from "zustand";

type InventoryState = {
  products: never[];
};

export const useInventoryStore = create<InventoryState>(() => ({
  products: [],
}));
