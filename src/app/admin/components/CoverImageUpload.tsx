import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface CoverImageUploadProps {
  initialUrl?: string;
  onFileSelect: (fileUrl: string) => void;
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({ onFileSelect, initialUrl = "" }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialUrl);
  console.log("initialUrl", initialUrl);

  useEffect(() => {
    // Sync external changes to initialUrl
    if (initialUrl) {
      setPreviewUrl(initialUrl);
    }
  }, [initialUrl]);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result); // Show preview
        onFileSelect(result); // Pass data URL or replace with actual upload logic
      };

      reader.readAsDataURL(file); // For preview (optional if using upload logic)
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
          p: 2,
          textAlign: "center",
          color: "#888",
          cursor: "pointer",
          backgroundColor: "#fafafa",
        }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Cover Preview"
            style={{
              width: "100%",
              maxHeight: 200,
              objectFit: "contain",
              borderRadius: 8,
              marginBottom: 8,
            }}
          />
        ) : (
          <>
            <Box sx={{ fontSize: 40, mb: 1 }}>⬆️</Box>
            <Typography>Click to upload cover image</Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              JPEG, PNG, WebP, GIF up to 10MB • Auto-optimized
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default CoverImageUpload;
