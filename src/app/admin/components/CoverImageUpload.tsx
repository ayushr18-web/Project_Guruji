import { Box, Typography } from "@mui/material";
import { Loader } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";

interface CoverImageUploadProps {
  initialUrl?: string;
  onFileSelect: (fileUrl: string) => void;
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({ onFileSelect, initialUrl = "" }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialUrl);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Sync external changes to initialUrl
    if (initialUrl) {
      setPreviewUrl(initialUrl);
    }
    setIsLoading(false);
  }, [initialUrl]);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

 const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;


    try {
      const uploadedUrl = await uploadFile(file);
      // Optional: Save the URL to your backend DB if needed here
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  async function uploadFile(file: File) {
    // 1️⃣ Request presigned URL
    setIsLoading(true);
    const response = await fetch(`https://qa.sanatni.com/api/v1/s3_upload/generate-presigned-url`, {
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

    console.log("Uploading file to S3 with URL:", uploadUrl);
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
    onFileSelect(s3FileUrl); // Notify parent component with the new URL
    setPreviewUrl(s3FileUrl); // Update preview URL
    setIsLoading(false);
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
       
        {isLoading ? <Loader /> :previewUrl ? (
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
