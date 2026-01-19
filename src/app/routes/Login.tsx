import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { PageContainer } from "../../shared/components/PageContainer";
import { useAuthStore } from "../../modules/auth/auth.store";
import { loginApi } from "../../modules/auth/auth.api";
import axios from "axios";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const setAuth = useAuthStore((s) => s.setAuth);

  const navigate = useNavigate();
  const location = useLocation() as any;
  const backTo = location?.state?.from || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginApi({ email: email.trim(), password });
      setAuth(res);
      navigate(backTo, { replace: true });
    } catch (err) {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as {
      message?: string;
      issues?: { message: string }[];
    };

    if (data?.issues?.length) {
      setError(data.issues[0].message);
    } else {
      setError(data?.message || "Login failed");
    }
  } else {
    setError("Unexpected error");
  }
}

  };

  return (
    <PageContainer>
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "70vh" }}>
        <Card variant="outlined" sx={{ width: "min(520px, 100%)" }}>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LockOutlinedIcon />
                <Box>
                  <Typography variant="h3">Login</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sign in to access the app.
                  </Typography>
                </Box>
              </Stack>

              {error && <Alert severity="error">{error}</Alert>}

              <Box component="form" onSubmit={onSubmit}>
                <Stack spacing={1.5}>
                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setError("");
                      setEmail(e.target.value);
                    }}
                    fullWidth
                    required
                  />

                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setError("");
                      setPassword(e.target.value);
                    }}
                    fullWidth
                    required
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<LockOutlinedIcon />}
                  >
                    Login
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="outlined"
                    fullWidth
                  >
                    New here? Register
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </PageContainer>
  );
}
