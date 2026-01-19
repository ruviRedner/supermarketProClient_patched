import { apiClient } from "../../shared/api/apiClient";

export type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  expiryDate: string;
  imageUrl?: string;
};

export type ProductsQueryParams = {
  q?: string;
  min?: string;
  max?: string;
  cat?: string;
  sort?: "price-asc" | "price-desc";
};

export async function fetchProducts(params: ProductsQueryParams = {}): Promise<Product[]> {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (!v) return;
    sp.set(k, String(v));
  });

  const qs = sp.toString();
  const res = await apiClient.get<Product[]>(`/api/products${qs ? `?${qs}` : ""}`);
  return res.data;
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await apiClient.get<Product>(`/api/products/${id}`);
  return res.data;
}

// Admin only
export async function createProduct(payload: {
  name: string;
  price: number;
  category: string;
  expiryDate: string; // YYYY-MM-DD
  imageUrl?: string;
}): Promise<Product> {
  const res = await apiClient.post<Product>("/api/products", payload);
  return res.data;
}

// Admin only
export async function updateProduct(
  id: string,
  patch: Partial<{
    name: string;
    price: number;
    category: string;
    expiryDate: string;
    imageUrl?: string;
  }>,
): Promise<Product> {
  const res = await apiClient.patch<Product>(`/api/products/${id}`, patch);
  return res.data;
}

// Admin only
export async function deleteProduct(id: string): Promise<void> {
  await apiClient.delete(`/api/products/${id}`);
}
