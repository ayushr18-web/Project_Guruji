import { Box, Typography } from "@mui/material";
import { Loader } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface MediaUploadProps {
  initialUrl?: string;
  onFileSelect: (fileUrl: string) => void;
  accept?: "audio" | "video";
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  onFileSelect,
  initialUrl = "",
  accept = "audio",
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>(initialUrl);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialUrl) {
      setMediaUrl(initialUrl);
    }
  }, [initialUrl]);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadFile(file);
      // Final S3 URL will be used as media URL
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  async function uploadFile(file: File) {
    setIsLoading(true);

    const response = await fetch(`https://qa.sanatni.com/api/v1/s3_upload/generate-presigned-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        content_type: file.type,
      }),
    });

    if (!response.ok) {
      setIsLoading(false);
      throw new Error("Failed to generate presigned URL");
    }

    const data = await response.json();
    const uploadUrl = data.upload_url;

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      setIsLoading(false);
      throw new Error("Failed to upload to S3");
    }

    const finalUrl = uploadUrl.split("?")[0];
    setMediaUrl(finalUrl);
    onFileSelect(finalUrl);
    setIsLoading(false);
    return finalUrl;
  }

  return (
    <>
      <input
        type="file"
        accept={accept === "audio" ? "audio/*" : "video/*"}
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
        {isLoading ? (
          <Loader />
        ) : mediaUrl ? (
          accept === "audio" ? (
            <audio controls style={{ width: "100%" }}>
              <source src={mediaUrl} />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <video controls style={{ width: "100%", maxHeight: 200 }}>
              <source src={mediaUrl} />
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <>
            <Box sx={{ fontSize: 40, mb: 1 }}>⬆️</Box>
            <Typography>Click to upload {accept} file</Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Supported formats: {accept === "audio" ? "MP3, WAV" : "MP4, WebM"} up to 100MB
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default MediaUpload;
