import { Link as RouterLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import { PageContainer } from "../../shared/components/PageContainer";
import { getProduct } from "../../modules/products/products.service";
import type { Product } from "../../modules/products/productsApi";
import { useCartStore } from "../../modules/cart/cartStore";

export function ProductDetails() {
  const { id } = useParams();
  const add = useCartStore((s) => s.add);

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <PageContainer>
        <Typography>Loading...</Typography>
      </PageContainer>
    );
  }

  if (isError || !product) {
    return (
      <PageContainer>
        <Alert severity="error">Failed to load product.</Alert>
        <Button
          component={RouterLink}
          to="/products"
          startIcon={<ArrowBackOutlinedIcon />}
          sx={{ mt: 2 }}
        >
          Back to products
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Stack spacing={2}>
        <Button
          component={RouterLink}
          to="/products"
          startIcon={<ArrowBackOutlinedIcon />}
          sx={{ width: "fit-content" }}
        >
          Back
        </Button>

        <Card variant="outlined">
          <CardContent>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip size="small" label={product.category} />
                <Typography variant="caption" color="text.secondary">
                  Exp: {new Date(product.expiryDate).toLocaleDateString()}
                </Typography>
              </Stack>

              <Typography variant="h3">{product.name}</Typography>

              <Typography sx={{ fontWeight: 900, fontSize: 20 }}>₪ {product.price}</Typography>

              {product.imageUrl && (
                <Box
                  component="img"
                  alt={product.name}
                  src={product.imageUrl}
                  sx={{
                    width: "100%",
                    maxHeight: 320,
                    objectFit: "cover",
                    borderRadius: 2,
                    mt: 1,
                  }}
                />
              )}

              <Box sx={{ pt: 1 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddShoppingCartOutlinedIcon />}
                  onClick={() => add(product)}
                >
                  Add to cart
                </Button>
              </Box>

              {/* NOTE: No ID is displayed */}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </PageContainer>
  );
}
