"use client";

import React from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    IconButton,
    Grid,
    Button as MuiButton,
    MenuItem,
} from "@mui/material";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import CoverImageUpload from "../../components/CoverImageUpload";
import Button from "../../../../../components/Button";
import { DeleteIcon, PlusIcon } from "lucide-react";
import { hinduMonths } from "../../../../../constants/admin";
import { inputStyles } from "../../../../../constants/styles";
import { IAddEditFormProps } from "../../../../../types/common";
import { init } from "next/dist/compiled/webpack/webpack";

const tomorrow = format(new Date(Date.now() + 86400000), "yyyy-MM-dd");

const formSchema = z.object({
    name: z.string().min(1, "Festival name is required"),
    hindu_month: z.string().min(1, "Hindu month is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    cover_image_url: z.string().url("Cover image URL must be a valid URL"),
    alternate_names: z
        .array(z.string().min(1, "Alternate name cannot be empty"))
        .min(1, "At least one alternate name is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddEditFestival: React.FC<IAddEditFormProps> = ({
    onSubmit = null,
    initialData = {},
    isLoading = false,
}) => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData.name || "",
            hindu_month: initialData.hindu_month || "",
            start_date: initialData.start_date || "",
            end_date: initialData.end_date || "",
            cover_image_url: initialData.cover_image_url || "",
            alternate_names: Array.isArray(initialData.alternate_names)
                ? initialData.alternate_names
                : [initialData.alternate_names || ""],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "alternate_names",
    });

    const startDate = watch("start_date");

    return (
        <Box sx={{ p: 4, backgroundColor: "#fdfaf6" }}>
            <Typography variant="h5" gutterBottom>
                Create Festival
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 4,
                        alignItems: "flex-start",
                    }}
                >
                    {/* Left Panel */}
                    <Box sx={{ flex: 2 }}>
                        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Festival Details
                            </Typography>

                            <TextField
                                label="Name *"
                                fullWidth
                                margin="normal"
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                            />

                            <Grid mt={2} container spacing={2}>
                                <Grid>
                                    <TextField
                                        label="Start Date *"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ min: tomorrow }}
                                        {...register("start_date")}
                                        error={!!errors.start_date}
                                        helperText={errors.start_date?.message}
                                        sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                                    />
                                </Grid>
                                <Grid>
                                    <TextField
                                        label="End Date *"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ min: startDate || tomorrow }}
                                        {...register("end_date")}
                                        error={!!errors.end_date}
                                        helperText={errors.end_date?.message}
                                        sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                                    />
                                </Grid>
                            </Grid>

                            <TextField
                                label="Hindu Month *"
                                select
                                fullWidth
                                margin="normal"
                                {...register("hindu_month")}
                                error={!!errors.hindu_month}
                                helperText={errors.hindu_month?.message}
                                sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                            >
                                {hinduMonths.map((month) => (
                                    <MenuItem key={month.value} value={month.value}>
                                        {month.label}
                                    </MenuItem>
                                ))}
                            </TextField>


                            <Box mt={3}>
                                <Typography variant="subtitle1" mb={1}>
                                    Alternate Names
                                </Typography>
                                {fields.map((field, index) => (
                                    <Grid container spacing={1} alignItems="center" key={field.id}>
                                        <Grid>
                                            <TextField
                                                fullWidth
                                                {...register(`alternate_names.${index}`)}
                                                placeholder={`Alternate name ${index + 1}`}
                                                error={!!errors.alternate_names?.[index]}
                                                helperText={errors.alternate_names?.[index]?.message}
                                                sx={{ flex: 1, minWidth: 220, ...inputStyles }}
                                            />
                                        </Grid>
                                        <Grid>
                                            <IconButton
                                                onClick={() => remove(index)}
                                                disabled={fields.length === 1}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}
                                <MuiButton
                                    startIcon={<PlusIcon />}
                                    sx={{ mt: 2 }}
                                    onClick={() => append("")}
                                    variant="outlined"
                                >
                                    Add Alternate Name
                                </MuiButton>
                            </Box>
                        </Paper>

                        <Button
                            text="Submit Festival"
                            type="submit"
                            variant="primary"
                            className="w-full flex justify-center"
                        />
                    </Box>

                    {/* Right Panel (Cover Image) */}
                    <Box sx={{ flex: 1, minWidth: 280 }}>
                        <Paper elevation={2} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Cover Image
                            </Typography>
                            <CoverImageUpload
                                initialUrl={watch("cover_image_url")}
                                onFileSelect={(fileUrl: string) => {
                                    setValue("cover_image_url", fileUrl, {
                                        shouldValidate: true,
                                    });
                                }}
                            />
                            {errors.cover_image_url && (
                                <Typography color="error" variant="body2" mt={1}>
                                    {errors.cover_image_url.message}
                                </Typography>
                            )}
                        </Paper>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default AddEditFestival;
