import { Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ProductCard } from "../../../modules/products/ProductCard";
import { Product } from "../../../modules/products/productsApi";

type Props = {
  data?: Product[];
  isLoading: boolean;
  isError: boolean;
  onAddToCart: (p: Product) => void;
};

export function ProductsGrid({ data, isLoading, isError, onAddToCart }: Props) {
  if (isLoading) return <Alert severity="info">Loading products…</Alert>;
  if (isError) return <Alert severity="error">Failed to load products.</Alert>;

  const list = data ?? [];
  if (list.length === 0) return <Alert severity="info">No results found.</Alert>;

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {list.map((p) => (
        <Grid key={p._id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ProductCard product={p} onAddToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
}
