import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useAuthStore } from "../../modules/auth/auth.store";
import { useCartTotalQty } from "../../modules/cart/cartStore";

export function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const totalQty = useCartTotalQty();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="default"
      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Toolbar sx={{ gap: 1.5 }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
          sx={{ fontWeight: 900 }}
        >
          SupermarketPro
        </Typography>

        <Box sx={{ flex: 1 }} />

        <Button component={RouterLink} to="/" color="inherit">
          Home
        </Button>
        <Button component={RouterLink} to="/products" color="inherit">
          Products
        </Button>
        <Button component={RouterLink} to="/cart" color="inherit">
          Cart ({totalQty})
        </Button>
        <Button component={RouterLink} to="/orders" color="inherit">
          Orders
        </Button>

        {user?.role === "admin" && (
          <>
            <Button component={RouterLink} to="/admin/orders" color="inherit">
              Admin Orders
            </Button>
            <Button component={RouterLink} to="/admin/inventory" color="inherit">
              Inventory
            </Button>
            <Button component={RouterLink} to="/admin/expiry" color="inherit">
              Expiry
            </Button>
          </>
        )}

        <Button component={RouterLink} to="/login" variant="outlined">
          {user ? `Hi, ${user.name}` : "Login"}
        </Button>

        {user && (
          <Button onClick={logout} variant="contained">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
