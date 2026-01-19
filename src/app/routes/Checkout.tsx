import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { PageContainer } from "../../shared/components/PageContainer";
import { useCartStore, useCartTotalPrice } from "../../modules/cart/cartStore";
import type { CheckoutFormData } from "../../modules/orders/checkout.types";
import { createOrder } from "../../modules/orders/orders.service";

export function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const total = useCartTotalPrice();

  const totalQty = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      notes: "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    await createOrder({
      items: items.map((i) => ({ productId: i.product._id, qty: i.qty })),
      customer: {
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        notes: data.notes || undefined,
      },
    });

    clearCart();
    navigate("/order-success");
  };

  return (
    <PageContainer>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h3">Checkout</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Enter delivery details and confirm your order.
          </Typography>
        </Box>

        {items.length === 0 ? (
          <Alert severity="info">
            Your cart is empty. Add products before checkout.
          </Alert>
        ) : (
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="flex-start"
          >
            {/* Left: Delivery form */}
            <Box sx={{ flex: 1, width: "100%" }}>
              <Card variant="outlined">
                <CardContent>
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocalShippingOutlinedIcon />
                      <Typography variant="h6">Delivery details</Typography>
                    </Stack>

                    <Divider />

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Stack spacing={1.5}>
                        <TextField
                          label="Full name"
                          fullWidth
                          error={Boolean(errors.fullName)}
                          helperText={errors.fullName ? "Required" : " "}
                          {...register("fullName", { required: true })}
                        />

                        <TextField
                          label="Phone"
                          fullWidth
                          error={Boolean(errors.phone)}
                          helperText={errors.phone ? "Required" : " "}
                          {...register("phone", { required: true })}
                        />

                        <TextField
                          label="Address"
                          fullWidth
                          error={Boolean(errors.address)}
                          helperText={errors.address ? "Required" : " "}
                          {...register("address", { required: true })}
                        />

                        <TextField
                          label="Notes (optional)"
                          fullWidth
                          multiline
                          minRows={3}
                          {...register("notes")}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<CheckCircleOutlineIcon />}
                          disabled={isSubmitting}
                        >
                          Place order
                        </Button>
                      </Stack>
                    </form>
                  </Stack>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ width: { xs: "100%", md: 360 } }}>
              <Card variant="outlined" sx={{ position: "sticky", top: 90 }}>
                <CardContent>
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <ReceiptLongOutlinedIcon />
                      <Typography variant="h6">Order summary</Typography>
                    </Stack>

                    <Divider />

                    <Stack spacing={1}>
                      {items.map((i) => (
                        <Stack
                          key={i.product._id}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="baseline"
                        >
                          <Box>
                            <Typography sx={{ fontWeight: 900 }}>
                              {i.product.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {i.qty} × ₪ {i.product.price}
                            </Typography>
                          </Box>

                          <Typography sx={{ fontWeight: 900 }}>
                            ₪ {(i.qty * i.product.price).toFixed(2)}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">Items</Typography>
                      <Typography sx={{ fontWeight: 900 }}>{totalQty}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">Total</Typography>
                      <Typography sx={{ fontWeight: 900 }}>
                        ₪ {total.toFixed(2)}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Stack>
        )}
      </Stack>
    </PageContainer>
  );
}
