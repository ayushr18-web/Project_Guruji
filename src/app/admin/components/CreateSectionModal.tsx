

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
import { RichTextEditor } from '../../../../components/RichTextEditor';

interface CreateChapterModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (title: string, description: string) => void;
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

const CreateSectionModal: React.FC<CreateChapterModalProps> = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleCreate = () => {
    if (!title.trim()) {
      alert('Section title is required');
      return;
    }
    onCreate?.(title, content);
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
            <RichTextEditor initialValue={content} onChange={setContent}/>
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

export default CreateSectionModal;
