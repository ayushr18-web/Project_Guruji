"use client";

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
import { useRouter } from "next/navigation";
import { ITeachings } from "../../../../../types/teachings";
import Button from "../../../../../components/Button";
import CoverImageUpload from "../../components/CoverImageUpload";
import { RichTextEditor } from "../../../../../components/RichTextEditor";
import { inputStyles } from "../../../../../constants/styles";

const book_formats = [
  { value: "ARTICLE", label: "ARTICLE" },
  { value: "VIDEO", label: "VIDEO" },
  { value: "AUDIO", label: "AUDIO" },
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  content_type: z.string().min(1, "Content type is required"),
  featured: z.boolean().optional(),
  // cover_image_url: z.string().url("Cover image URL must be valid").optional(),
  // file_url: z.string().url("File URL must be valid").optional(),
  // status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT").optional(),
});


export type FormData = z.infer<typeof formSchema>;

export interface AddEditTeachingProps {
  onSubmit?: (data: ITeachings) => void;
  initialData?: ITeachings;
  categories?: any;
  isLoading?: boolean;
}

const AddEditTeaching: React.FC<AddEditTeachingProps> = ({
  onSubmit = null,
  initialData = {},
  isLoading = false,
  categories
}) => {
  const router = useRouter();


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
      description: initialData.description || "",
      content_type: initialData.content_type || "ARTICLE",
      category: initialData.category_id || "",
      featured: initialData.featured || false,
      cover_image_url: initialData.cover_image_url || "",
      premium_content: initialData.premium_content || "",
      status: initialData.status === "DRAFT" || initialData.status === "PUBLISHED" ? initialData.status : "DRAFT",
      file_url: initialData.file_url || "",
      ...initialData, // Spread initialData to set other fields if needed
    },
  });


  return (
    <Box sx={{ p: 4, backgroundColor: "#fdfaf6" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" gutterBottom>
          {initialData?.id ? "Edit Book" : "Create New Book"}
        </Typography>
        {initialData.id && <Button variant="primary" onClick={() => router.push(`/admin/books/${initialData.id}/content`)} text="Manage Content" />}
      </Box>
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
          <Box sx={{ flex: 1 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Create Teaching
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
                    defaultValue={initialData.category_id || ""}
                    onChange={(e) => setValue("category", e.target.value, { shouldValidate: true })}
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
                  error={!!errors.content_type}
                  sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                >
                  <InputLabel id="content_type">Type *</InputLabel>
                  <Select
                    labelId="content_type"
                    id="content_type"
                    {...register("content_type")}
                    label="Book Format *"
                    defaultValue={initialData.content_type || "ARTICLE"}
                    disabled={!!initialData.id} // Disable if editing an existing book
                  >
                    {book_formats.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.content_type?.message}</FormHelperText>
                </FormControl>
              </Box>

             {watch("content_type") === 'ARTICLE' && <RichTextEditor initialValue={initialData?.premium_content || ''} onChange={(content) => setValue("premium_content", content)}/>}

              {(watch("content_type") === 'VIDEO' || watch("content_type") === 'AUDIO') && <TextField
                  {...register("file_url")}
                  label="File URL *"
                  fullWidth
                  margin="normal"
                  error={!!errors.file_url}
                  helperText={errors.file_url?.message}
                  sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                />}

              <Box sx={{ mt: 2, flex: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      {...register("featured")}
                      checked={watch("featured")}
                      onChange={(e) => setValue("featured", e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#4A2E23', // brown thumb
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#4A2E23', // brown track
                        },
                      }}
                    />
                  }
                  label="Featured Book"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={watch("status") === "PUBLISHED"}
                      onChange={(e) => setValue("status", e.target.checked ? "PUBLISHED" : "DRAFT")}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#4A2E23', // brown thumb
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#4A2E23', // brown track
                        },
                      }}
                    />
                  }
                  label="Published Book"
                />
              </Box>

            </Paper>

            
            <Button
              text={initialData?.id ? "Update Teaching" : "Create Teaching"}
              type="submit"
              variant="primary"
              className="w-full flex justify-center"
            />
          </Box>

          {/* Right Panel */}
          <Box sx={{ flex: 1, minWidth: 280 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cover Image
              </Typography>
              <CoverImageUpload initialUrl={watch("cover_image_url")} onFileSelect={(fileUrl: string) => {
                setValue("cover_image_url", fileUrl, { shouldValidate: true });
              }} />
            </Paper>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddEditTeaching;
