import { fetchProductById, fetchProducts, type Product, type ProductsQueryParams } from "./productsApi";

export async function getProducts(params: ProductsQueryParams = {}): Promise<Product[]> {
  return fetchProducts(params);
}

export async function getProduct(id: string): Promise<Product> {
  return fetchProductById(id);
}
