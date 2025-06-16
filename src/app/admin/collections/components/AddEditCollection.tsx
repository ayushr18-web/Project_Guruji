"use client";

import {
    Box,
    Paper,
    Typography,
    TextField,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Button from "../../../../../components/Button";
import CoverImageUpload from "../../components/CoverImageUpload";
import { ICollection } from "../../../../../types/collections";
import { inputStyles } from "../../../../../constants/styles";

const formSchema = z.object({
    name: z.string().min(1, "name is required"),
    description: z.string().min(1, "Description is required"),
    is_featured: z.boolean().optional(),
    cover_image_url: z.string().url("Cover image URL must be valid").optional(),
    tags: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export interface AddEditFormProps {
    isLoading: boolean;
    onSubmit?: (data: ICollection) => void;
    initialData?: Partial<ICollection>;
    categories?: any;
}




const AddEditCollection: React.FC<AddEditFormProps> = ({
    onSubmit = null,
    initialData = {},
    isLoading = false,
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
            name: initialData.name || "",
            description: initialData.description || "",
            is_featured: initialData.is_featured || false,
            cover_image_url: initialData.cover_image_url || "",
            tags: Array.isArray(initialData.tags) ? initialData.tags.join(",") : "",
            ...initialData, // Spread initialData to set other fields if needed
        },
    });


    return (
        <Box sx={{ p: 4, backgroundColor: "#fdfaf6" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" gutterBottom>
                    {initialData?.id ? "Edit Collection" : "Create New Collection"}
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
                                Create Collection
                            </Typography>

                            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                <TextField
                                    {...register("name")}
                                    label="name *"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
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
                                            {...register("is_featured")}
                                            checked={watch("is_featured")}
                                            onChange={(e) => setValue("is_featured", e.target.checked)}
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
                                    label="is_featured Collection"
                                />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                    Display this Collection in the featured section
                                </Typography>
                            </Box>
                        </Paper>

                        <Button
                            text={initialData?.id ? "Update Collection" : "Create Collection"}
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

export default AddEditCollection;
