import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

type Props = {
  totalQty: number;
  total: number;
  onCheckout: () => void;
};

export function CartSummaryCard({ totalQty, total, onCheckout }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h6">Summary</Typography>
          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Items</Typography>
            <Typography sx={{ fontWeight: 800 }}>{totalQty}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Total</Typography>
            <Typography sx={{ fontWeight: 900 }}>₪ {total.toFixed(2)}</Typography>
          </Stack>

          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartCheckoutIcon />}
            onClick={onCheckout}
          >
            Proceed to checkout
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
