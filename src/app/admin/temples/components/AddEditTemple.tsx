"use client";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../../components/Button";
import { inputStyles } from "../../../../../constants/styles";
import { IAddEditFormProps } from "../../../../../types/common";
import MultiImageUpload from "../../../../../components/MultiImageUpload";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { useGetPlaces } from "../../../../../hooks/usePlaces";

const formSchema = z.object({
  name: z.string().min(1, "Temple name is required"),
  main_deity: z.string().min(1, "Main deity is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  place_id: z.string().min(1, "Place selection is required"),
  cover_image: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one cover image is required"),
});

export type FormData = z.infer<typeof formSchema>;

interface PlaceOption {
  id: string;
  name: string;
}

const AddEditTemple: React.FC<IAddEditFormProps> = ({
  onSubmit = null,
  initialData = {},
  isLoading = false,
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
      name: initialData.name || "",
      main_deity: initialData.main_deity || "",
      description: initialData.description || "",
      address: initialData.address || "",
      place_id: initialData.place_id || "",
      cover_image: initialData.cover_image || [],
    },
  });

  const [searchText, setSearchText] = useState("");

  const { data: initialPlaces = [], isFetching: loadingPlaces } = useGetPlaces({
    skip: 0,
    limit: 10,
    name: searchText,
  });

  const placeOptions: PlaceOption[] = initialPlaces?.items || [];

  const selectedPlace = placeOptions.find(
    (opt) => opt.id === watch("place_id")
  ) || null;


  return (
    <Box sx={{ p: 4, backgroundColor: "#fdfaf6" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">
          {initialData?.id ? "Edit Temple" : "Create New Temple"}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
          }}
        >
          {/* Left Panel */}
          <Box sx={{ flex: 2 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Temple Details
              </Typography>

              <TextField
                {...register("name")}
                label="Temple Name *"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={inputStyles}
              />

              <TextField
                {...register("main_deity")}
                label="Main Deity *"
                fullWidth
                margin="normal"
                error={!!errors.main_deity}
                helperText={errors.main_deity?.message}
                sx={inputStyles}
              />

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
                {...register("address")}
                label="Address *"
                fullWidth
                margin="normal"
                error={!!errors.address}
                helperText={errors.address?.message}
                sx={inputStyles}
              />

              {/* Searchable Dropdown for Place */}
              <Autocomplete
                options={placeOptions}
                getOptionLabel={(option) => option.name}
                filterOptions={(x) => x}
                value={selectedPlace}
                onInputChange={(event, value, reason) => {
                  if (reason === "input") {
                    setSearchText(value); // Only update if typed
                  }
                }}
                onChange={(_, selectedOption) => {
                  setValue("place_id", selectedOption?.id || "", {
                    shouldValidate: true,
                  });
                }}
                loading={loadingPlaces}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Place *"
                    margin="normal"
                    fullWidth
                    error={!!errors.place_id}
                    helperText={errors.place_id?.message}
                    sx={inputStyles}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingPlaces && <CircularProgress size={20} />}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />


            </Paper>

            <Button
              text={initialData?.id ? "Update Temple" : "Create Temple"}
              type="submit"
              variant="primary"
              className="w-full flex justify-center"
            />
          </Box>

          {/* Right Panel */}
          <Box sx={{ flex: 1, minWidth: 280 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cover Images
              </Typography>
              <MultiImageUpload
                initialUrls={watch("cover_image")}
                onFilesChange={(urls: string[]) => {
                  setValue("cover_image", urls, { shouldValidate: true });
                }}
              />
              {errors.cover_image && (
                <Typography variant="caption" color="error">
                  {errors.cover_image.message}
                </Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddEditTemple;
