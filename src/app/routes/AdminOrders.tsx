import {
  Alert,
  Box,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PageContainer } from "../../shared/components/PageContainer";
import {
  adminGetAllOrders,
  adminUpdateStatus,
  type Order,
  type OrderStatus,
} from "../../modules/orders/orders.service";

const STATUSES: OrderStatus[] = [
  "NEW",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELED",
];

export function AdminOrders() {
  const qc = useQueryClient();

  const { data: orders = [], isLoading, isError } = useQuery<Order[]>({
    queryKey: ["adminOrders"],
    queryFn: adminGetAllOrders,
  });

  const updateStatusMut = useMutation({
    mutationFn: (payload: { id: string; status: OrderStatus }) => adminUpdateStatus(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminOrders"] }),
  });

  return (
    <PageContainer>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h3">Admin Orders</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            All orders in the system (admin only).
          </Typography>
        </Box>

        {isLoading && <Alert severity="info">Loading orders…</Alert>}
        {isError && <Alert severity="error">Failed to load orders.</Alert>}

        {!isLoading && !isError && orders.length === 0 ? (
          <Alert severity="info">No orders yet.</Alert>
        ) : (
          <Card variant="outlined">
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Customer</b></TableCell>
                    <TableCell><b>Total</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Items</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o._id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>
                          {new Date(o.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(o.createdAt).toLocaleTimeString()}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography sx={{ fontWeight: 800 }}>{o.customer.fullName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {o.customer.phone}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {o.customer.address}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ fontWeight: 900 }}>
                        ₪ {o.total.toFixed(2)}
                      </TableCell>

                      <TableCell>
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                          <Select
                            value={o.status}
                            onChange={(e) =>
                              updateStatusMut.mutate({ id: o._id, status: e.target.value as OrderStatus })
                            }
                            disabled={updateStatusMut.isPending}
                          >
                            {STATUSES.map((s) => (
                              <MenuItem key={s} value={s}>
                                {s}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {o.items.map((i) => `${i.nameSnapshot} × ${i.qty}`).join(", ")}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {updateStatusMut.isError && (
                <Alert sx={{ mt: 2 }} severity="error">
                  Failed to update status.
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </Stack>
    </PageContainer>
  );
}
