import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { IChapter } from "../../../../../types/books";
import { Edit, Trash } from "lucide-react";

interface ChapterListProps {
  chapters: IChapter[];
  onEdit?: (id: IChapter) => void;
  onDelete?: (id: string) => void;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, onEdit, onDelete }) => {
  if (chapters?.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        No chapters added yet.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {chapters?.map((chapter, index) => (
        <Paper
          key={chapter.id}
          sx={{ p: 2, borderRadius: 2, backgroundColor: "#f9f9f9" }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box width="80%">
              <Typography variant="subtitle1" fontWeight="bold">
                {index + 1}. {chapter.title}
              </Typography>

              <audio controls style={{ marginTop: 8, width: "100%" }}>
                <source src={chapter?.audio_url} />
                Your browser does not support the audio element.
              </audio>
            </Box>

            <Box>
              {onEdit && (
                <IconButton onClick={() => onEdit(chapter)}>
                  <Edit />
                </IconButton>
              )}
              {onDelete && (
                <IconButton onClick={() => onDelete(chapter.id)} color="error">
                  <Trash />
                </IconButton>
              )}
            </Box>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export default ChapterList;
