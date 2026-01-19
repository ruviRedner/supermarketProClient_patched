import type { Product } from "./productsApi";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Typography, Button, Stack, Chip, Box } from "@mui/material";

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1.2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip size="small" label={product.category} />
            <Typography variant="caption" color="text.secondary">
              Exp: {new Date(product.expiryDate).toLocaleDateString()}
            </Typography>
          </Stack>

          {product.imageUrl && (
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              sx={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          )}

          <Typography
            variant="h6"
            component={RouterLink}
            to={`/products/${product._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            sx={{ fontWeight: 900 }}
          >
            {product.name}
          </Typography>

          <Typography sx={{ fontWeight: 800 }}>₪ {product.price}</Typography>

          <Button variant="contained" onClick={() => onAddToCart?.(product)}>
            Add to cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
