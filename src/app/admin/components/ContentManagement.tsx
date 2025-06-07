"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import {
  Plus as AddIcon,
} from "lucide-react";
import { IChapterOrBookListResponse } from "../../../../types/books";
import Chapter from "./Chapter";
import CreateChapterModal from "./CreateChapterModal";


const ContentManagement = ({ chapters, bookId } : { chapters: IChapterOrBookListResponse[], bookId: string}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, background: "#fdfaf6" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Content Management
          </Typography>
          <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
            Sections & Chapters
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Organize your book content into sections and chapters for a structured reading experience.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon size={18} />}
          sx={{
            background: "#4a2e23",
            color: "#fff",
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
            fontSize: 16,
            "&:hover": { background: "#6b4423" },
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Add Chapter
        </Button>
      </Box>
      {isModalOpen && <CreateChapterModal bookId={bookId} open={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {chapters?.items?.map((ch) => (
          <Chapter chapter={ch} key={ch.id} bookId={bookId} />
        ))}
      </Box>
    </Box>
  );
};

export default ContentManagement;