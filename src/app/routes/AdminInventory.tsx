import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PageContainer } from "../../shared/components/PageContainer";
import type { Product } from "../../modules/products/productsApi";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  fetchProducts,
} from "../../modules/products/productsApi";

export function AdminInventory() {
  const qc = useQueryClient();

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ["adminProducts"],
    queryFn: () => fetchProducts(),
  });

  const createMut = useMutation({
    mutationFn: createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });

  const updateMut = useMutation({
    mutationFn: (p: { id: string; patch: any }) => updateProduct(p.id, p.patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });

  const deleteMut = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });

  return (
    <PageContainer>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h3">Inventory</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage products (admin only).
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <CreateProductForm
              onCreate={(payload) => createMut.mutate(payload)}
              isSubmitting={createMut.isPending}
            />
            {createMut.isError && (
              <Alert sx={{ mt: 2 }} severity="error">
                Failed to create product.
              </Alert>
            )}
          </CardContent>
        </Card>

        {isLoading && <Alert severity="info">Loading products…</Alert>}
        {isError && <Alert severity="error">Failed to load products.</Alert>}

        {!isLoading && !isError && products.length === 0 ? (
          <Alert severity="info">No products yet.</Alert>
        ) : (
          <Card variant="outlined">
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell><b>Price</b></TableCell>
                    <TableCell><b>Expiry (YYYY-MM-DD)</b></TableCell>
                    <TableCell><b>Image URL</b></TableCell>
                    <TableCell align="right"><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {products.map((p) => (
                    <InventoryRow
                      key={p._id}
                      product={p}
                      onSave={(patch) => updateMut.mutate({ id: p._id, patch })}
                      onDelete={() => deleteMut.mutate(p._id)}
                      saving={updateMut.isPending}
                      deleting={deleteMut.isPending}
                    />
                  ))}
                </TableBody>
              </Table>

              {(updateMut.isError || deleteMut.isError) && (
                <Alert sx={{ mt: 2 }} severity="error">
                  Failed to update/delete product.
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </Stack>
    </PageContainer>
  );
}

function CreateProductForm({
  onCreate,
  isSubmitting,
}: {
  onCreate: (payload: {
    name: string;
    category: string;
    price: number;
    expiryDate: string;
    imageUrl?: string;
  }) => void;
  isSubmitting: boolean;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const canSubmit =
    name.trim() && category.trim() && price.trim() && expiryDate.trim() && !Number.isNaN(Number(price));

  return (
    <Stack spacing={1.5}>
      <Typography sx={{ fontWeight: 900 }}>Add new product</Typography>
      <Divider />

      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          size="small"
        />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          label="Expiry (YYYY-MM-DD)"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          fullWidth
          size="small"
        />
      </Stack>

      <TextField
        label="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        fullWidth
        size="small"
      />

      <Button
        variant="contained"
        startIcon={<AddOutlinedIcon />}
        disabled={!canSubmit || isSubmitting}
        onClick={() => {
          onCreate({
            name: name.trim(),
            category: category.trim(),
            price: Number(price),
            expiryDate: expiryDate.trim(),
            imageUrl: imageUrl.trim() || undefined,
          });
          setName("");
          setCategory("");
          setPrice("");
          setExpiryDate("");
          setImageUrl("");
        }}
        sx={{ width: "fit-content" }}
      >
        Add product
      </Button>

      <Typography variant="caption" color="text.secondary">
        Note: create/update/delete are admin-only endpoints on the server.
      </Typography>
    </Stack>
  );
}

function InventoryRow({
  product,
  onSave,
  onDelete,
  saving,
  deleting,
}: {
  product: Product;
  onSave: (patch: { name: string; category: string; price: number; expiryDate: string; imageUrl?: string }) => void;
  onDelete: () => void;
  saving: boolean;
  deleting: boolean;
}) {
  const [localName, setLocalName] = useState(product.name);
  const [localCategory, setLocalCategory] = useState(product.category);
  const [localPrice, setLocalPrice] = useState(String(product.price));
  const [localExpiry, setLocalExpiry] = useState(product.expiryDate);
  const [localImageUrl, setLocalImageUrl] = useState(product.imageUrl ?? "");

  const canSave =
    localName.trim() &&
    localCategory.trim() &&
    localExpiry.trim() &&
    localPrice.trim() &&
    !Number.isNaN(Number(localPrice));

  return (
    <TableRow hover>
      <TableCell sx={{ width: 260 }}>
        <TextField value={localName} onChange={(e) => setLocalName(e.target.value)} size="small" fullWidth />
      </TableCell>

      <TableCell sx={{ width: 200 }}>
        <TextField value={localCategory} onChange={(e) => setLocalCategory(e.target.value)} size="small" fullWidth />
      </TableCell>

      <TableCell sx={{ width: 140 }}>
        <TextField value={localPrice} onChange={(e) => setLocalPrice(e.target.value)} size="small" fullWidth />
      </TableCell>

      <TableCell sx={{ width: 190 }}>
        <TextField value={localExpiry} onChange={(e) => setLocalExpiry(e.target.value)} size="small" fullWidth />
      </TableCell>

      <TableCell sx={{ width: 260 }}>
        <TextField
          value={localImageUrl}
          onChange={(e) => setLocalImageUrl(e.target.value)}
          size="small"
          fullWidth
          placeholder="https://..."
        />
      </TableCell>

      <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<SaveOutlinedIcon />}
          disabled={!canSave || saving}
          onClick={() =>
            onSave({
              name: localName.trim(),
              category: localCategory.trim(),
              price: Number(localPrice),
              expiryDate: localExpiry.trim(),
              imageUrl: localImageUrl.trim() || undefined,
            })
          }
          sx={{ mr: 1 }}
        >
          Save
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          size="small"
          startIcon={<DeleteOutlineIcon />}
          disabled={deleting}
          onClick={onDelete}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
