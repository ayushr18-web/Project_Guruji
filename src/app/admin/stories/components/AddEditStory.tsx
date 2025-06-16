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
import Button from "../../../../../components/Button";
import CoverImageUpload from "../../components/CoverImageUpload";
import { IStoryItem } from "../../../../../types/stories";
import { RichTextEditor } from "../../../../../components/RichTextEditor";
import { inputStyles } from "../../../../../constants/styles";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author_name: z.string().min(1, "author_name is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    tags: z.string().optional(),
    featured: z.boolean().optional(),
    cover_image_url: z.string().url("Cover image URL must be valid").optional(),
});

export type FormData = z.infer<typeof formSchema>;

export interface AddEditFormProps {
    isLoading: boolean;
    onSubmit?: (data: IStoryItem) => void;
    initialData?: Partial<IStoryItem>;
    categories?: any;
}

const AddEditStory: React.FC<AddEditFormProps> = ({
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
            author_name: initialData.author_name || "",
            description: initialData.description || "",
            category: initialData.category_id || "",
            tags: Array.isArray(initialData.tags) ? initialData.tags.join(",") : (initialData.tags || ""),
            featured: initialData.featured || false,
            cover_image_url: initialData.cover_image_url || "",
            premium_content: initialData.premium_content || "",
            ...initialData, // Spread initialData to set other fields if needed
        },
    });


    return (
        <Box sx={{ p: 4, backgroundColor: "#fdfaf6" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" gutterBottom>
                    {initialData?.id ? "Edit Story" : "Create New Story"}
                </Typography>
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
                    <Box sx={{ flex: 2 }}>
                        <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Create Story
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
                            </Box>


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
                                    label="Featured Story"
                                />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                    Display this story in the featured section
                                </Typography>
                            </Box>
                            <RichTextEditor initialValue={initialData?.premium_content || ''} onChange={(content: string) => setValue("premium_content", content)} />
                        </Paper>

                        <Button
                            text={initialData?.id ? "Update Story" : "Create Story"}
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

export default AddEditStory;
