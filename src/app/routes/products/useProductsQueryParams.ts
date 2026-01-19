import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../shared/hooks/useDebounce";
export type SortValue = "none" | "price-asc" | "price-desc";

export function useProductsQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const minPrice = searchParams.get("min") ?? "";
  const maxPrice = searchParams.get("max") ?? "";
  const category = searchParams.get("cat") ?? "all";
  const sort = (searchParams.get("sort") as SortValue) ?? "none";

  const debouncedQuery = useDebounce(query, 250);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    const normalized = value?.trim?.() ?? value;

    if (!normalized || normalized === "none" || normalized === "all") next.delete(key);
    else next.set(key, normalized);

    setSearchParams(next);
  };

  const resetAll = () => setSearchParams({});

  return {
    query,
    debouncedQuery,
    minPrice,
    maxPrice,
    category,
    sort,
    setParam,
    resetAll,
  };
}
