import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import type { CartItem } from "../../../modules/cart/cartStore";
import { CartItemRow } from "./CartItemRow";

type Props = {
  items: CartItem[];
  inc: (productId: string) => void;
  dec: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export function CartItemsCard({ items, inc, dec, remove, clear }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1.5}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={1}
          >
            <Typography variant="h6">Items</Typography>

            <Button variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={clear}>
              Clear cart
            </Button>
          </Stack>

          <Divider />

          <Stack spacing={1.5}>
            {items.map((i) => (
              <Box key={i.product._id}>
                <CartItemRow item={i} inc={inc} dec={dec} remove={remove} />
              </Box>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
