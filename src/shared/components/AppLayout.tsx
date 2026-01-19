import { ReactNode } from "react";
import { Box } from "@mui/material";
import { Navbar } from "./Navbar";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Box component="main" sx={{ pt: 3, pb: 6 }}>
        {children}
      </Box>
    </Box>
  );
}
