import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";

import { useCartStore } from "../../../modules/cart/cartStore";
import { getCartRecommendations } from "../../../modules/recommendations/recommendations.api";

export function RecommendationsPanel() {
  const items = useCartStore((s) => s.items);
  const add = useCartStore((s) => s.add);

  const payload = useMemo(
    () => ({
      items: items.map((i) => ({ productId: i.product._id, qty: i.qty })),
    }),
    [items]
  );

  const enabled = payload.items.length > 0;

  // key יציב כדי שלא יעשה ספאם ריקווסט
  const signature = useMemo(
    () => payload.items.map((x) => `${x.productId}:${x.qty}`).join("|"),
    [payload]
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ai-recommendations", signature],
    queryFn: () => getCartRecommendations(payload),
    enabled,
    staleTime: 1000 * 60 * 2,
  });

  if (!enabled) return null;
  if (isLoading) {
  return <Alert severity="info">Thinking…</Alert>;
}

if (isError) {
  return (
    <Alert severity="info">
      No recommendations right now.
    </Alert>
  );
}

if (!data || data.recommendations.length === 0) {
  return (
    <Alert severity="info">
      No recommendations right now.
    </Alert>
  );
}

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1.5}>
          <Box>
            <Typography variant="h6">AI recommendations</Typography>
            <Typography variant="body2" color="text.secondary">
              Suggested items that complement your cart.
            </Typography>
          </Box>

          <Divider />

          {isLoading && <Alert severity="info">Thinking…</Alert>}
          {isError && <Alert severity="warning">Couldn’t load recommendations.</Alert>}

          {!isLoading && !isError && (data?.recommendations?.length ?? 0) === 0 && (
            <Alert severity="info">No recommendations right now.</Alert>
          )}

          {!isLoading && !isError && (data?.recommendations?.length ?? 0) > 0 && (
            <Stack spacing={1.25}>
              {data!.recommendations.map((r) => (
                <Box
                  key={r.product._id}
                  sx={{
                    p: 1.25,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 900 }}>{r.product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {r.reason}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.25, fontWeight: 800 }}>
                      ₪ {r.product.price}
                    </Typography>
                  </Box>

                  <Button variant="contained" onClick={() => add(r.product)}>
                    Add
                  </Button>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
