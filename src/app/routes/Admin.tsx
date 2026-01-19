import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { PageContainer } from "../../shared/components/PageContainer";
import { fetchProducts, type Product } from "../../modules/products/productsApi";
import { adminGetAllOrders, type Order } from "../../modules/orders/orders.service";

export function Admin() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["adminDashboardProducts"],
    queryFn: () => fetchProducts(),
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["adminDashboardOrders"],
    queryFn: adminGetAllOrders,
  });

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <PageContainer>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h3">Admin</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Overview of orders and inventory.
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography color="text.secondary">Products</Typography>
              <Typography variant="h3">{products.length}</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography color="text.secondary">Orders</Typography>
              <Typography variant="h3">{orders.length}</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography color="text.secondary">Revenue</Typography>
              <Typography variant="h3">₪ {revenue.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </PageContainer>
  );
}
