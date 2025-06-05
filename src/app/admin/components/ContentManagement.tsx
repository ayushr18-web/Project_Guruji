"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Plus as AddIcon,
  ArrowDown,
  Edit,
  Trash2,
} from "lucide-react";
import CreateSectionModal from "./CreateSectionModal";


interface Chapter {
  id: number;
  title: string;
  description?: string;
}

interface Section {
  id: number;
  title: string;
  chapters: Chapter[];
}

const initialSections: Section[] = [
  {
    id: 1,
    title: "INTRODUCTION",
    chapters: [
      {
        id: 1,
        title: "INTRODUCTION",
        description:
          "The Gita is a doctrine of universal truth. Its message is universal, sublime, and non-sectarian although it is a part of the scriptural trinity of Sanaatan Dharma, commonly known as Hinduism.",
      },
    ],
  },
  {
    id: 2,
    title: "CHAPTER 1",
    chapters: Array.from({ length: 7 }, (_, i) => ({
      id: i + 2,
      title: `Chapter 1.${i + 1}`,
      description: "Chapter description...",
    })),
  },
  {
    id: 3,
    title: "CHAPTER 2",
    chapters: Array.from({ length: 13 }, (_, i) => ({
      id: i + 9,
      title: `Chapter 2.${i + 1}`,
      description: "Chapter description...",
    })),
  },
  {
    id: 4,
    title: "CHAPTER 3",
    chapters: Array.from({ length: 9 }, (_, i) => ({
      id: i + 22,
      title: `Chapter 3.${i + 1}`,
      description: "Chapter description...",
    })),
  },
  {
    id: 5,
    title: "CHAPTER 4",
    chapters: Array.from({ length: 10 }, (_, i) => ({
      id: i + 31,
      title: `Chapter 4.${i + 1}`,
      description: "Chapter description...",
    })),
  },
];

const ContentManagement = () => {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

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
          Add Section
        </Button>
      </Box>
      {isModalOpen && <CreateSectionModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {sections.map((section, idx) => (
          <Accordion
            key={section.id}
            expanded={expanded === section.id}
            onChange={() => handleExpand(section.id)}
            sx={{
              background: "#fffaf3",
              borderRadius: 3,
              boxShadow: "none",
              border: "1px solid #f1e1c3",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ArrowDown />}
              aria-controls={`panel${section.id}-content`}
              id={`panel${section.id}-header`}
              sx={{
                px: 3,
                py: 2,
                minHeight: 0,
                "& .MuiAccordionSummary-content": {
                  alignItems: "center",
                  margin: 0,
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ flex: 1, fontSize: 26, display: "flex", alignItems: "center" }}
              >
                {`${idx + 1}. ${section.title.toUpperCase()} (${section.chapters.length} Chapters)`}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon size={16} />}
                  sx={{
                    background: "#fff",
                    color: "#4a2e23",
                    borderColor: "#e6d4b7",
                    fontWeight: 600,
                    "&:hover": { background: "#f9f1e1", borderColor: "#d4b896" },
                  }}
                  size="small"
                >
                  Add Chapter
                </Button>
                <IconButton aria-label="Edit Section" sx={{ color: "#6b4423" }}>
                  <Edit size={18} />
                </IconButton>
                <IconButton aria-label="Delete Section" sx={{ color: "#b8956f" }}>
                  <Trash2 size={18} />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "#fefdf8", borderRadius: 2, px: 3, py: 2 }}>
              {section.chapters.map((chapter) => (
                <Paper
                  key={chapter.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    background: "#fff",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {chapter.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap maxWidth={700}>
                      {chapter.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton aria-label="Edit Chapter" sx={{ color: "#6b4423" }}>
                      <Edit size={18} />
                    </IconButton>
                    <IconButton aria-label="Delete Chapter" sx={{ color: "#b8956f" }}>
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default ContentManagement;