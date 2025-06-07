import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { X } from 'lucide-react';
import { useCreateChaper } from '../../../../hooks/useBook';

interface CreateChapterModalProps {
  open: boolean;
  onClose: () => void;
  bookId: string;
  data?: any; // Adjust type as needed
  chapterId?: string;
}

const inputStyles = {
  color: "#4A2E23",
  "& .MuiInputBase-input": {
    color: "#4A2E23", // input text
  },
  "& .MuiInputLabel-root": {
    color: "#4A2E23", // label text
  },
  "& .MuiFormHelperText-root": {
    color: "#4A2E23", // helper/error text
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4A2E23",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4A2E23",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ccc",
  },
};

const CreateChapterModal: React.FC<CreateChapterModalProps> = ({ data, open, onClose, bookId, chapterId }) => {
  const [title, setTitle] = useState(data?.title || '');
  const [description, setDescription] = useState(data?.description || '');

  const createChapterMutation = useCreateChaper(bookId, chapterId);

  const handleCreate = () => {
    if (!title.trim()) {
      alert('Section title is required');
      return;
    }

    console.log('Creating chapter with title:',bookId,  title, 'and description:', description);

    // Call the mutation to create chapter
    createChapterMutation.mutate( { title, description}, {
    onSuccess: (data) => {
      // onCreate?.(data.title, data.description ?? '');
      console.log('Chapter created successfully:', data);
      setTitle('');
      setDescription('');
      onClose();
    },
    onError: (error) => {
      console.error('Create chapter failed:', error);
      alert('Failed to create chapter. Please try again.');
    },
  });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Create New Section
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <X />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            fullWidth
            required
            label="Section Title"
            placeholder="Enter section title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            sx={{  ...inputStyles }}
          />
          <Typography variant="body2" color="textSecondary">
            Sections help organize your book into logical parts.
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Description (Optional)"
            placeholder="Enter a brief description for this section"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{  ...inputStyles }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{ backgroundColor: '#4B2E2E', '&:hover': { backgroundColor: '#3b2525' } }}
        >
          Create Section
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateChapterModal;
