import { Container } from "@mui/material";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 3,
        // חשוב: שלא יהיה “מתחת” ל-navbar
        pt: "calc(64px + 24px)",
      }}
    >
      {children}
    </Container>
  );
}
