import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface CoverImageUploadProps {
  initialUrl?: string;
  onFileSelect: (fileUrl: string) => void;
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({ onFileSelect, initialUrl = "" }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialUrl);

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
    if (!file) return;

    console.log("Selected file:", file);

    try {
      const uploadedUrl = await uploadFile(file);
      console.log("File uploaded to S3:", uploadedUrl);
      // Optional: Save the URL to your backend DB if needed here
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  async function uploadFile(file: File) {
    // 1️⃣ Request presigned URL
    const response = await fetch('http://ec2-13-61-196-239.eu-north-1.compute.amazonaws.com/api/v1/s3_upload/generate-presigned-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.name,
        content_type: file.type,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate presigned URL');
    }

    const data = await response.json();
    const uploadUrl = data.upload_url;

    // 2️⃣ Upload file to S3
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload file to S3');
    }

    // 3️⃣ Return the final S3 URL
    const s3FileUrl = uploadUrl.split('?')[0];
    return s3FileUrl;
  }

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
