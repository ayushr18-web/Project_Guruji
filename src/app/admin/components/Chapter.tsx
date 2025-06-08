"use client"

import {
    Accordion,
    AccordionSummary,
    Button,
    Typography,
    Box,
    IconButton,
    AccordionDetails
} from "@mui/material";
import { IChapter } from "../../../../types/books";
import { ArrowDown, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateSectionModal from "./CreateSectionModal";
import { useCreateSection, useSections } from "../../../../hooks/useBook";
import CreateChapterModal from "./CreateChapterModal";

const Chapter = ({ chapter, bookId }: { chapter: IChapter, bookId: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const createSectionMutation = useCreateSection(bookId, chapter.id);

    // Lazy load: only fetch sections when expanded
    const { data: sections, isLoading, refetch } = useSections(bookId, chapter.id);

    const handleAccordionChange = (_: any, isExpanded: boolean) => {
        setExpanded(isExpanded);
        if (isExpanded) {
            refetch(); // fetch sections only when expanded
        }
    };

    const handleCreateAndUpdateSection = (title: string, content: string) => {
        createSectionMutation.mutate({ title, body: content }, {
            onSuccess: (data) => {
                console.log('Section created successfully:', data);
                refetch(); // refresh list after creation
            },
            onError: (error) => {
                console.error('Create section failed:', error);
                alert('Failed to create section. Please try again.');
            },
        });
        setIsModalOpen(false);
    };

    return (
        <Accordion
            expanded={expanded}
            onChange={handleAccordionChange}
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
            </AccordionSummary>

            <AccordionDetails sx={{ background: "#fefdf8", borderRadius: 2, px: 3, py: 2 }}>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
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
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Section
                    </Button>
                    <IconButton aria-label="Edit Section" sx={{ color: "#6b4423" }} onClick={() => setIsEditModalOpen(true)}>
                        <Edit size={18} />
                    </IconButton>
                    <IconButton aria-label="Delete Section" sx={{ color: "#b8956f" }}>
                        <Trash2 size={18} />
                    </IconButton>
                </Box>

                {isModalOpen && (
                    <CreateSectionModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onCreate={handleCreateAndUpdateSection}
                    />
                )}

                {isEditModalOpen && (
                    <CreateChapterModal
                        open={isEditModalOpen}
                        data={{ title: chapter.title, description: chapter.description }}
                        bookId={bookId}
                        onClose={() => setIsEditModalOpen(false)}
                        chapterId={chapter.id}
                    />
                )}

                {isLoading ? (
                    <Typography>Loading sections...</Typography>
                ) : (
                    sections?.items?.map((section) => (
                        <Box
                            key={section.id}
                            sx={{
                                mb: 1,
                                p: 1,
                                borderRadius: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            {/* Left: Title and Body */}
                            <Box>
                                <Typography fontWeight={600}>{section.title}</Typography>
                                <Typography variant="body2">
                                    {section.body.split(" ").slice(0, 10).join(" ")}
                                    {section.body.split(" ").length > 10 && "..."}
                                </Typography>
                            </Box>

                            {/* Right: Action Icons */}
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <IconButton aria-label="Edit">
                                    <Edit fontSize="small" />
                                </IconButton>
                                <IconButton aria-label="Delete">
                                    <Trash2 fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>

                    ))
                )}
            </AccordionDetails>
        </Accordion>

    );
};

export default Chapter;
