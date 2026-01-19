import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "./shared/components/AppLayout";
import { AppRouter } from "./app/routes/AppRouter";
import { QueryProvider } from "./app/providers/QueryProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider";

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <ThemeProvider>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </ThemeProvider>
    </QueryProvider>
  </BrowserRouter>
  );
}
