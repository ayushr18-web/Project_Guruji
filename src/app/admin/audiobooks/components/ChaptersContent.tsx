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
import AddEditChapter from "./AddEditChapter";
import ChaptersList from "./ChaptersList";
import { useDeleteChapter } from "../../../../../hooks/useBook";
import { IChapter } from "../../../../../types/books";

const ChaptersContent = ({ chapters, id }: { chapters: any, id: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState<IChapter | null>(null);

    const deleteChapterMutation = useDeleteChapter();

    const handleEditChapter = (chapter: IChapter) => {
        // Logic to handle chapter editing
        console.log('Editing chapter:', chapter);
        setSelectedChapter(chapter);
        setIsModalOpen(true);
    };

    const handleDeleteChapter = (cId: string) => {
        deleteChapterMutation.mutate(
            { bookId: id, chapterId: cId },
            {
                onSuccess: () => {
                    console.log('Chapter deleted successfully');
                },
                onError: (error) => {
                    console.error('Failed to delete chapter:', error);
                },
            }
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, background: "#fdfaf6" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                    <Typography variant="h5" fontWeight={700}>
                        All Chapters
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Organize your audiobook content into chapters for a structured listening experience.
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
            {isModalOpen && <AddEditChapter onClose={() => setIsModalOpen(false)} open={isModalOpen} id={id} chapter={selectedChapter} />}
            <ChaptersList chapters={chapters?.items} onEdit={handleEditChapter} onDelete={handleDeleteChapter} />
        </Box>
    );
};

export default ChaptersContent;