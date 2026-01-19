import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import { PageContainer } from "../../shared/components/PageContainer";
import { useAuthStore } from "../../modules/auth/auth.store";

export function Home() {
  const user = useAuthStore((s) => s.user);

  return (
    <PageContainer>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h3">Welcome{user ? `, ${user.name}` : ""}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            A modern supermarket experience — products, cart, orders and admin tools.
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 900, fontSize: 18 }}>Quick actions</Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  component={RouterLink}
                  to="/products"
                  variant="contained"
                  startIcon={<ShoppingBagOutlinedIcon />}
                >
                  Browse products
                </Button>

                <Button
                  component={RouterLink}
                  to="/orders"
                  variant="outlined"
                  startIcon={<StorefrontOutlinedIcon />}
                >
                  View orders
                </Button>
              </Stack>

              <Typography variant="caption" color="text.secondary">
                Data is loaded from the server.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </PageContainer>
  );
}
