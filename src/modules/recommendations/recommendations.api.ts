import { apiClient } from "../../shared/api/apiClient";
import type { CartRecommendationsResponse } from "./recommendations.types";

export async function getCartRecommendations(input: {
  items: Array<{ productId: string; qty: number }>;
}) {
  const res = await apiClient.post<CartRecommendationsResponse>(
    "/api/recommendations/cart",
    input
  );
  return res.data;
}
