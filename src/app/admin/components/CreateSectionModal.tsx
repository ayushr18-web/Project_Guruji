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
import { Cross } from 'lucide-react';

interface CreateSectionModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (title: string, description: string) => void;
}

const CreateSectionModal: React.FC<CreateSectionModalProps> = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    onCreate?.(title, description);
    setTitle('');
    setDescription('');
    onClose();
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
          <Cross />
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

export default CreateSectionModal;
