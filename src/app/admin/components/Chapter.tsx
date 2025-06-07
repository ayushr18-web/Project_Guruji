"use client"

import { Accordion, AccordionSummary, Button, Typography, Box, IconButton, AccordionDetails } from "@mui/material";
import { IChapter } from "../../../../types/books";
import { ArrowDown, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateSectionModal from "./CreateSectionModal";

const Chapter = ({ chapter, bookId }: { chapter: IChapter, bookId: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCreateAndUpdateSection = (title: string, content: string) => {
        // Logic to handle the creation and update of the section
        console.log(`Creating section with title: ${title} and content: ${content}`);
        // You can add your API call or state update logic here
        setIsModalOpen(false); // Close the modal after creation
    };
    return (
        <Accordion
            key={chapter.id}
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
                aria-controls={`panel${chapter.id}-content`}
                id={`panel${chapter.id}-header`}
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
                    {`${chapter.chapter_number}. ${chapter.title.toUpperCase()} ( Chapters)`}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<Plus size={16} />}
                        sx={{
                            background: "#fff",
                            color: "#4a2e23",
                            borderColor: "#e6d4b7",
                            fontWeight: 600,
                            "&:hover": { background: "#f9f1e1", borderColor: "#d4b896" },
                        }}
                        size="small"
                        type="button"
                        onClick={() => setIsModalOpen(true)}

                    >
                        Add Section
                    </Button>
                    <IconButton aria-label="Edit Section" sx={{ color: "#6b4423" }}>
                        <Edit size={18} />
                    </IconButton>
                    <IconButton aria-label="Delete Section" sx={{ color: "#b8956f" }}>
                        <Trash2 size={18} />
                    </IconButton>
                </Box>
            </AccordionSummary>
            {isModalOpen && <CreateSectionModal onCreate={handleCreateAndUpdateSection}  open={isModalOpen}  onClose={() =>  setIsModalOpen(false)}/>}
            <AccordionDetails sx={{ background: "#fefdf8", borderRadius: 2, px: 3, py: 2 }}>
            </AccordionDetails>
        </Accordion>
    );
}
export default Chapter;