"use client";

import { useState } from "react";
import {
  Button,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const categories = [
  { value: "", label: "Select a category" },
  { value: "fiction", label: "Fiction" },
  { value: "nonfiction", label: "Non-fiction" },
  { value: "science", label: "Science" },
  // Add more categories as needed
];

const formats = [
  { value: "text", label: "Text (Sections & Chapters)" },
  { value: "audio", label: "Audio" },
  // Add more formats as needed
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  format: z.string().min(1, "Format is required"),
  tags: z.string().optional(),
  featured: z.boolean().optional(),
  // coverImage: z.any().optional(), // For file upload, handle separately
});

export type FormData = z.infer<typeof formSchema>;
export interface AddEditFormProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

const AddEditForm: React.FC<AddEditFormProps> = ({
  open = true,
  onClose = null,
  onSubmit = null,
  initialData = {},
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      category: "",
      format: "text",
      tags: "",
      featured: false,
      ...initialData,
    },
  });

  const onSubmitHandler = async (data: FormData) => {
    setLoading(true);
    try {
      await onSubmit?.(data);
      onClose?.();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Book
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
          }}
        >
          {/* Left Panel */}
          <Box sx={{ flex: 2, minWidth: 0 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Book Information
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  {...register("title")}
                  label="Title *"
                  fullWidth
                  margin="normal"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  sx={{ flex: 1, minWidth: 220 }}
                />
                <TextField
                  {...register("author")}
                  label="Author *"
                  fullWidth
                  margin="normal"
                  error={!!errors.author}
                  helperText={errors.author?.message}
                  sx={{ flex: 1, minWidth: 220 }}
                />
              </Box>
              <TextField
                {...register("description")}
                label="Description *"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  {...register("category")}
                  label="Category *"
                  select
                  fullWidth
                  margin="normal"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  sx={{ flex: 1, minWidth: 220 }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  {...register("format")}
                  label="Content Format"
                  select
                  fullWidth
                  margin="normal"
                  error={!!errors.format}
                  helperText={errors.format?.message}
                  sx={{ flex: 1, minWidth: 220 }}
                >
                  {formats.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Text Content</Typography>
                <Typography variant="body2" color="text.secondary">
                  Save the book first, then use the "Manage Content" button to add sections and chapters.
                </Typography>
              </Box>
              <TextField
                {...register("tags")}
                label="Tags"
                fullWidth
                margin="normal"
                helperText="Enter tags separated by commas"
              />
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      {...register("featured")}
                      checked={watch("featured")}
                      onChange={(e) => setValue("featured", e.target.checked)}
                    />
                  }
                  label="Featured Book"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  Display this book in the featured section
                </Typography>
              </Box>
            </Paper>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5, fontWeight: 600, fontSize: 16 }}
            >
              {loading ? "Submitting..." : "Create Book"}
            </Button>
          </Box>
          {/* Right Panel */}
          <Box sx={{ flex: 1, minWidth: 280 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cover Image
              </Typography>
              <Box
                sx={{
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  p: 4,
                  textAlign: "center",
                  color: "#888",
                  cursor: "pointer",
                }}
              >
                <Box sx={{ fontSize: 40, mb: 1 }}>⬆️</Box>
                <Typography>Click to upload cover image</Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  JPEG, PNG, WebP, GIF up to 10MB • Auto-optimized
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddEditForm;
