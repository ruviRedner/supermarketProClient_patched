import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { PageContainer } from "../../shared/components/PageContainer";

export function OrderSuccess() {
  return (
    <PageContainer>
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
        <Card variant="outlined" sx={{ width: "min(640px, 100%)" }}>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircleOutlineIcon />
                <Box>
                  <Typography variant="h3">Order placed</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your order was created successfully.
                  </Typography>
                </Box>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  component={RouterLink}
                  to="/orders"
                  variant="contained"
                  startIcon={<ReceiptLongOutlinedIcon />}
                  fullWidth
                >
                  View orders
                </Button>

                <Button
                  component={RouterLink}
                  to="/products"
                  variant="outlined"
                  startIcon={<ShoppingBagOutlinedIcon />}
                  fullWidth
                >
                  Continue shopping
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </PageContainer>
  );
}
