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
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PdfUploadSection } from "./PdfUploadSection";
import Button from "../../../../components/Button";
import CoverImageUpload from "./CoverImageUpload";
import { IBook } from "../../../../types/books";

const book_formats = [
  { value: "TEXT", label: "Text (Sections & Chapters)" },
  { value: "PDF", label: "PDF Document" },
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author_name: z.string().min(1, "author_name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  book_format: z.string().min(1, "book_format is required"),
  tags: z.string().optional(),
  featured: z.boolean().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export interface AddEditFormProps {
  isLoading: boolean;
  onSubmit?: (data: IBook) => void;
  initialData?: Partial<IBook>;
  categories?: any;
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
  categories
}) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
      author_name: initialData.author_name || "",
      description: initialData.description || "",
      category: initialData.category_id || "",
      book_format: initialData.book_format || "TEXT",
      tags: initialData.tags?.join(",") || "",
      featured: initialData.featured || false,
      ...initialData, // Spread initialData to set other fields if needed
    },
  });


  return (
    <Box sx={{ p: 4, backgroundColor: "#fdfaf6" }}>
      <Typography variant="h4" gutterBottom>
        {initialData?.id ? "Create New Book" : "Edit Book"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                <FormControl
                  fullWidth
                  error={!!errors.category}
                  sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                >
                  <InputLabel id="category-label">Category *</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category_id"
                    {...register("category")} 
                    label="Category *"
                  >
                    {categories?.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.category?.message}</FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth
                  error={!!errors.book_format}
                  sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                >
                  <InputLabel id="book-format-label">Book Format *</InputLabel>
                  <Select
                    labelId="book-format-label"
                    id="book_format"
                    {...register("book_format")}
                    label="Book Format *"
                    defaultValue={initialData.book_format || "TEXT"}
                  >
                    {book_formats.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.book_format?.message}</FormHelperText>
                </FormControl>
              </Box>


              {watch("book_format") === "text" && (
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

              {watch("book_format") === "pdf" && <PdfUploadSection />}

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
