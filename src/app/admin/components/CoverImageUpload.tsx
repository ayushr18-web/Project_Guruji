import { Box, Typography } from "@mui/material";
import React, { useRef } from "react";

const CoverImageUpload = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Box
        onClick={handleBoxClick}
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
    </>
  );
};

export default CoverImageUpload;
