import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

import type { SortValue } from "./useProductsQueryParams";

type Props = {
  query: string;
  minPrice: string;
  maxPrice: string;
  category: string;
  sort: SortValue;
  categories: string[];
  setParam: (key: string, value: string) => void;
  resetAll: () => void;
};

export function ProductsFilters({
  query,
  minPrice,
  maxPrice,
  category,
  sort,
  categories,
  setParam,
  resetAll,
}: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
              <SearchIcon fontSize="small" />
              <TextField
                label="Search"
                value={query}
                onChange={(e) => setParam("q", e.target.value)}
                fullWidth
                size="small"
              />
            </Stack>

            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={resetAll}
              sx={{ whiteSpace: "nowrap" }}
            >
              Reset
            </Button>
          </Stack>

          <Divider />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <PaidOutlinedIcon fontSize="small" />
              <TextField
                label="Min price"
                value={minPrice}
                onChange={(e) => setParam("min", e.target.value)}
                size="small"
                sx={{ width: { xs: "100%", md: 160 } }}
              />
              <TextField
                label="Max price"
                value={maxPrice}
                onChange={(e) => setParam("max", e.target.value)}
                size="small"
                sx={{ width: { xs: "100%", md: 160 } }}
              />
            </Stack>

            <Box sx={{ flex: 1 }} />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CategoryOutlinedIcon fontSize="small" />
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={category}
                    onChange={(e) => setParam("cat", String(e.target.value))}
                  >
                    {categories.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c === "all" ? "All categories" : c}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <SortIcon fontSize="small" />
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={sort}
                    onChange={(e) => setParam("sort", String(e.target.value))}
                  >
                    <MenuItem value="none">No sort</MenuItem>
                    <MenuItem value="price-asc">Price: low → high</MenuItem>
                    <MenuItem value="price-desc">Price: high → low</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            Filters are saved in the URL: <b>?q</b>, <b>min</b>, <b>max</b>, <b>cat</b>, <b>sort</b>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
