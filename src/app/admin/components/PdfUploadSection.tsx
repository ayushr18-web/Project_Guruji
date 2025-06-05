import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import {
  UploadCloud,
  Link as LinkIcon,
  FileText as PictureAsPdfIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";

export function PdfUploadSection() {
  const [activeTab, setActiveTab] = useState<"url" | "upload">("url");
  const { register } = useForm();

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 2,
        mt: 2,
        backgroundColor: "#fdfaf6",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
      >
        <UploadCloud fontSize="small" /> PDF Content
      </Typography>

      {/* Toggle Buttons */}
      <Box
        sx={{
          display: "flex",
          borderRadius: 2,
          overflow: "hidden",
          mb: 2,
          border: "1px solid #e0e0e0",
        }}
      >
        <Box
          onClick={() => setActiveTab("url")}
          sx={{
            flex: 1,
            textAlign: "center",
            p: 1.5,
            cursor: "pointer",
            backgroundColor: activeTab === "url" ? "#f5f1e9" : "#f1ede5",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <LinkIcon fontSize="small" /> URL
        </Box>
        <Box
          onClick={() => setActiveTab("upload")}
          sx={{
            flex: 1,
            textAlign: "center",
            p: 1.5,
            cursor: "pointer",
            backgroundColor: activeTab === "upload" ? "#f5f1e9" : "#f1ede5",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <UploadCloud fontSize="small" /> Upload
        </Box>
      </Box>

      {/* Conditional Form Inputs */}
      {activeTab === "url" ? (
        <>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            PDF URL
          </Typography>
          <TextField
            fullWidth
            placeholder="https://example.com/book.pdf"
            size="small"
            {...register("pdfUrl")}
            sx={{
              backgroundColor: "#fdfaf6",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </>
      ) : (
        <Box
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            py: 5,
            textAlign: "center",
            backgroundColor: "#fdfaf6",
          }}
        >
          <PictureAsPdfIcon sx={{ fontSize: 48, color: "#90a4ae" }} />
          <Button
            variant="contained"
            component="label"
            sx={{
              mt: 2,
              backgroundColor: "#4B2E2E",
              "&:hover": {
                backgroundColor: "#3b1e1e",
              },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            <UploadCloud sx={{ mr: 1 }} fontSize="small" />
            Select PDF File
            <input
              hidden
              accept=".pdf"
              type="file"
              {...register("pdfFile")}
            />
          </Button>
          <Typography variant="body2" sx={{ mt: 1, color: "#5c6672" }}>
            PDF files up to 100MB
          </Typography>
        </Box>
      )}

      {/* File info */}
      <Typography
        variant="caption"
        sx={{ mt: 2, display: "block", color: "#5c6672" }}
      >
        Maximum file size: 100MB
        <br />
        Supported format: PDF only
      </Typography>
    </Box>
  );
}
