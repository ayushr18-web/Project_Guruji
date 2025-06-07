"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PdfUploadSection } from "./PdfUploadSection";
import Button from "../../../../components/Button";
import CoverImageUpload from "./CoverImageUpload";

const categories = [
  { value: "", label: "Select a category" },
  { value: "fiction", label: "Fiction" },
  { value: "nonfiction", label: "Non-fiction" },
  { value: "science", label: "Science" },
];

const book_types = [
  { value: "text", label: "Text (Sections & Chapters)" },
  { value: "pdf", label: "PDF Document" },
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author_name: z.string().min(1, "author_name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  book_type: z.string().min(1, "book_type is required"),
  tags: z.string().optional(),
  featured: z.boolean().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export interface AddEditFormProps {
  isLoading: boolean;
  onSubmit?: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

const inputStyles = {
  color: "#4A2E23",
  "& .MuiInputBase-input": {
    color: "#4A2E23", // input text
  },
  "& .MuiInputLabel-root": {
    color: "#4A2E23", // label text
  },
  "& .MuiFormHelperText-root": {
    color: "#4A2E23", // helper/error text
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4A2E23",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4A2E23",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ccc",
  },
};


const AddEditForm: React.FC<AddEditFormProps> = ({
  onSubmit = null,
  initialData = {},
  isLoading = false,
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
      author_name: "",
      description: "",
      category: "",
      book_type: "text",
      tags: "",
      featured: false,
      ...initialData,
    },
  });

  const onSubmitHandler = async (data: FormData) => {
    setLoading(true);
    try {
      await onSubmit?.(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#fdfaf6" }}>
      <Typography variant="h4" gutterBottom>
        Create New Book
      </Typography>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            backgroundColor: "#fefbf5",
          }}
        >
          {/* Left Panel */}
          <Box sx={{ flex: 2 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Create Book 
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  {...register("title")}
                  label="Title *"
                  fullWidth
                  margin="normal"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                />
                <TextField
                  {...register("author_name")}
                  label="Author Name *"
                  fullWidth
                  margin="normal"
                  error={!!errors.author_name}
                  helperText={errors.author_name?.message}
                  sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                />
              </Box>

              <TextField
                {...register("description")}
                label="Description *"
                fullWidth
                multiline
                rows={3}
                margin="normal"
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={inputStyles}
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
                  sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  {...register("book_type")}
                  label="Content book_type"
                  select
                  fullWidth
                  margin="normal"
                  error={!!errors.book_type}
                  helperText={errors.book_type?.message}
                  sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                >
                  {book_types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {watch("book_type") === "text" && (
                <Box
                  sx={{
                    mt: 2,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    Text Content
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Save the book first, then use the "Manage Content" button to add sections and chapters.
                  </Typography>
                </Box>
              )}

              {watch("book_type") === "pdf" && <PdfUploadSection />}

              <TextField
                {...register("tags")}
                label="Tags"
                fullWidth
                margin="normal"
                helperText="Enter tags separated by commas"
                sx={inputStyles}
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
              text={"Create Book"}
              type="submit"
              variant="primary"
              className="w-full text-center"
            />
          </Box>

          {/* Right Panel */}
          <Box sx={{ flex: 1, minWidth: 280 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cover Image
              </Typography>
              <CoverImageUpload onFileSelect={(file) => {
                console.log("Selected file:", file);
                // You can save this to state or FormData
              }} />
            </Paper>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddEditForm;
