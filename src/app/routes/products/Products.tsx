import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Typography } from "@mui/material";
import { ProductsFilters } from "./ProductsFilters";
import { ProductsGrid } from "./ProductsGrid";
import { useProductsQueryParams } from "./useProductsQueryParams";
import { useCartStore } from "../../../modules/cart/cartStore";
import { getProducts } from "../../../modules/products/products.service";
import { Product } from "../../../modules/products/productsApi";
import { PageContainer } from "../../../shared/components/PageContainer";

export function Products() {
  const add = useCartStore((s) => s.add);

  const {
    query,
    debouncedQuery,
    minPrice,
    maxPrice,
    category,
    sort,
    setParam,
    resetAll,
  } = useProductsQueryParams();

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products", debouncedQuery, minPrice, maxPrice, category, sort],
    queryFn: () =>
      getProducts({
        q: debouncedQuery || undefined,
        min: minPrice || undefined,
        max: maxPrice || undefined,
        cat: category === "all" ? undefined : category,
        sort: sort === "none" ? undefined : sort,
      }),
  });

  const categories = useMemo(() => {
    const list = data ?? [];
    const unique = Array.from(new Set(list.map((p) => p.category))).sort();
    return ["all", ...unique];
  }, [data]);

  return (
    <PageContainer>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h3">Products</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Search, filter and add items to your cart.
          </Typography>
        </Box>

        <ProductsFilters
          query={query}
          minPrice={minPrice}
          maxPrice={maxPrice}
          category={category}
          sort={sort}
          categories={categories}
          setParam={setParam}
          resetAll={resetAll}
        />

        <ProductsGrid
          data={data}
          isLoading={isLoading}
          isError={isError}
          onAddToCart={add}
        />
      </Stack>
    </PageContainer>
  );
}
