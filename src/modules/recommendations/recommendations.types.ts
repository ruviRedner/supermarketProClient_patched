import type { Product } from "../products/productsApi";

export type AiRecommendation = {
  product: Product;
  reason: string;
};

export type CartRecommendationsResponse = {
  recommendations: AiRecommendation[];
};
