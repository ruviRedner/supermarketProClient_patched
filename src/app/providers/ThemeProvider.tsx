import { ReactNode } from "react";
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#F6F7FB", paper: "#FFFFFF" },
    primary: { main: "#2563EB" },
    secondary: { main: "#111827" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: `Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial`,
    h3: { fontWeight: 900, letterSpacing: -0.6 },
    h6: { fontWeight: 800 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(17,24,39,0.08)",
          boxShadow: "0 10px 30px rgba(17,24,39,0.06)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 14, textTransform: "none", fontWeight: 800 },
      },
    },
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
