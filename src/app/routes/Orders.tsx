import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";

import { PageContainer } from "../../shared/components/PageContainer";
import { getMyOrders, type Order } from "../../modules/orders/orders.service";

export function Orders() {
  const { data: orders = [], isLoading, isError } = useQuery<Order[]>({
    queryKey: ["myOrders"],
    queryFn: getMyOrders,
  });

  return (
    <PageContainer>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h3">Orders</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Your order history.
          </Typography>
        </Box>

        {isLoading && <Alert severity="info">Loading orders…</Alert>}
        {isError && <Alert severity="error">Failed to load orders.</Alert>}

        {!isLoading && !isError && orders.length === 0 ? (
          <Alert severity="info">No orders yet.</Alert>
        ) : (
          <Stack spacing={2}>
            {orders.map((o) => (
              <Card key={o._id} variant="outlined">
                <CardContent>
                  <Stack spacing={1.5}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      justifyContent="space-between"
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip size="small" label={new Date(o.createdAt).toLocaleDateString()} />
                        <Typography sx={{ fontWeight: 900 }}>
                          Total: ₪ {o.total.toFixed(2)}
                        </Typography>
                      </Stack>

                      <Typography variant="caption" color="text.secondary">
                        {new Date(o.createdAt).toLocaleString()}
                      </Typography>
                    </Stack>

                    <Typography variant="caption" color="text.secondary">
                      Status: <b>{o.status}</b>
                    </Typography>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: 800 }}>Details</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={1}>
                          <Typography sx={{ fontWeight: 900 }}>Items</Typography>
                          <Divider />

                          {o.items.map((i) => (
                            <Stack
                              key={`${o._id}-${i.productId}`}
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Typography>
                                {i.nameSnapshot} × {i.qty}
                              </Typography>
                              <Typography sx={{ fontWeight: 800 }}>
                                ₪ {(i.qty * i.priceSnapshot).toFixed(2)}
                              </Typography>
                            </Stack>
                          ))}

                          <Divider sx={{ my: 1 }} />

                          <Typography sx={{ fontWeight: 900 }}>Delivery</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {o.customer.fullName} • {o.customer.phone}
                          </Typography>
                          <Typography>{o.customer.address}</Typography>
                          {o.customer.notes && (
                            <Typography variant="body2" color="text.secondary">
                              Notes: {o.customer.notes}
                            </Typography>
                          )}
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </PageContainer>
  );
}
