import { useMemo } from "react";
import { Alert, Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { PageContainer } from "../../shared/components/PageContainer";
import { fetchProducts, type Product } from "../../modules/products/productsApi";

export function AdminExpiryAlerts() {
  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ["adminProductsExpiry"],
    queryFn: () => fetchProducts(),
  });

  const { expired, soon } = useMemo(() => {
    const now = new Date();
    const limit = new Date();
    limit.setDate(limit.getDate() + 7);

    const mapped = products.map((p) => ({ ...p, exp: new Date(p.expiryDate) }));

    const expired = mapped
      .filter((p) => p.exp < now)
      .sort((a, b) => a.exp.getTime() - b.exp.getTime());

    const soon = mapped
      .filter((p) => p.exp >= now && p.exp <= limit)
      .sort((a, b) => a.exp.getTime() - b.exp.getTime());

    return { expired, soon };
  }, [products]);

  return (
    <PageContainer>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h3">Expiry Alerts</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Expired items and items expiring in the next 7 days (admin only).
          </Typography>
        </Box>

        {isLoading && <Alert severity="info">Loading products…</Alert>}
        {isError && <Alert severity="error">Failed to load products.</Alert>}

        {!isLoading && !isError && (
          <>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Expired</Typography>
                <Divider sx={{ my: 1.5 }} />

                {expired.length === 0 ? (
                  <Alert severity="success">No expired products.</Alert>
                ) : (
                  <Stack spacing={1}>
                    {expired.map((p) => (
                      <Alert key={p._id} severity="error">
                        <b>{p.name}</b> — expired: {new Date(p.expiryDate).toLocaleDateString()}
                      </Alert>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Expiring in next 7 days</Typography>
                <Divider sx={{ my: 1.5 }} />

                {soon.length === 0 ? (
                  <Alert severity="info">No products expiring soon.</Alert>
                ) : (
                  <Stack spacing={1}>
                    {soon.map((p) => (
                      <Alert key={p._id} severity="warning">
                        <b>{p.name}</b> — expires: {new Date(p.expiryDate).toLocaleDateString()}
                      </Alert>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Stack>
    </PageContainer>
  );
}
