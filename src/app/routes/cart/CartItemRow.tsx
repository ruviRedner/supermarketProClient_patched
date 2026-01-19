import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import type { CartItem } from "../../../modules/cart/cartStore";

type Props = {
  item: CartItem;
  inc: (productId: string) => void;
  dec: (productId: string) => void;
  remove: (productId: string) => void;
};

export function CartItemRow({ item, inc, dec, remove }: Props) {
  const { product, qty } = item;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1,
        borderRadius: 2,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 900 }}>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ₪ {product.price} • {product.category}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="outlined"
          onClick={() => dec(product._id)}
          sx={{ minWidth: 44 }}
        >
          <RemoveIcon fontSize="small" />
        </Button>

        <Typography sx={{ width: 28, textAlign: "center" }}>{qty}</Typography>

        <Button
          variant="outlined"
          onClick={() => inc(product._id)}
          sx={{ minWidth: 44 }}
        >
          <AddIcon fontSize="small" />
        </Button>
      </Stack>

      <Typography sx={{ width: 110, textAlign: "right", fontWeight: 900 }}>
        ₪ {(product.price * qty).toFixed(2)}
      </Typography>

      <Button color="inherit" onClick={() => remove(product._id)}>
        Remove
      </Button>
    </Box>
  );
}
