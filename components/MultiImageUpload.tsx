import { Box, Typography, IconButton, Grid, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface MultiImageUploadProps {
  initialUrls?: string[];
  onFilesChange: (fileUrls: string[]) => void;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  initialUrls = [],
  onFilesChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>(initialUrls);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  useEffect(() => {
    setImageUrls(initialUrls);
  }, [initialUrls]);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        setLoadingIndex(imageUrls.length + i); // Index where this image will go
        const uploadedUrl = await uploadFile(file);
        setImageUrls((prev) => {
          const updated = [...prev, uploadedUrl];
          onFilesChange(updated);
          return updated;
        });
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setLoadingIndex(null);
      }
    }

    // Reset file input to allow uploading same file again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const response = await fetch(`https://qa.sanatni.com/api/v1/s3_upload/generate-presigned-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.name,
        content_type: file.type,
      }),
    });

    if (!response.ok) throw new Error('Failed to get upload URL');

    const data = await response.json();
    const uploadUrl = data.upload_url;

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (!uploadResponse.ok) throw new Error('Upload to S3 failed');

    return uploadUrl.split('?')[0];
  };

  const handleRemoveImage = (index: number) => {
    const updated = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updated);
    onFilesChange(updated);
  };

  return (
    <>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
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
          mb: 2,
        }}
      >
        <Box sx={{ fontSize: 40, mb: 1 }}>📤</Box>
        <Typography>Click to upload images</Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          JPEG, PNG, WebP, GIF up to 10MB each • Multiple allowed
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {imageUrls.map((url, index) => (
          <Grid item xs={6} md={4} lg={3} key={index}>
            <Box sx={{ position: "relative" }}>
              <img
                src={url}
                alt={`Preview ${index}`}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemoveImage(index)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "#fff",
                }}
              >
                <X size={18} />
              </IconButton>
              {loadingIndex === index && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MultiImageUpload;
