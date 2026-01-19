import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Stack, Typography } from "@mui/material";

import { RecommendationsPanel } from "./RecommendationsPanel";

import { CartSummaryCard } from "./CartSummaryCard";
import { useCartStore, useCartTotalPrice } from "../../../modules/cart/cartStore";
import { PageContainer } from "../../../shared/components/PageContainer";
import { CartItemsCard } from "./CartItemCard";

export function Cart() {
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const inc = useCartStore((s) => s.inc);
  const dec = useCartStore((s) => s.dec);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const total = useCartTotalPrice();

  const totalQty = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  return (
    <PageContainer>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h3">Cart</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Review your items and proceed to checkout.
          </Typography>
        </Box>

        {items.length === 0 ? (
          <Alert severity="info">Your cart is empty.</Alert>
        ) : (
          <Stack spacing={2}>
            <CartItemsCard
              items={items}
              inc={inc}
              dec={dec}
              remove={remove}
              clear={clear}
            />

            <CartSummaryCard
              totalQty={totalQty}
              total={total}
              onCheckout={() => navigate("/checkout")}
            />

            <RecommendationsPanel />
          </Stack>
        )}
      </Stack>
    </PageContainer>
  );
}
