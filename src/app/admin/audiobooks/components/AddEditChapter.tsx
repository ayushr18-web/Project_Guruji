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
import { inputStyles } from '../../../../../constants/styles';
import { useCreateChaper } from '../../../../../hooks/useBook';
import MediaUpload from '../../../../../components/MediaUpload';
import { IChapter } from '../../../../../types/books';

interface CreateChapterModalProps {
    open: boolean;
    onClose: () => void;
    id: string;
    chapter?: IChapter;
}


const AddEditChapter: React.FC<CreateChapterModalProps> = ({ open, onClose, id, chapter }) => {
    const [title, setTitle] = useState<string>(chapter?.title || '');
    const [audioUrl, setAudioUrl] = useState<string>(chapter?.audio_url || '');

    const createChapterMutation = useCreateChaper(id, chapter?.id);

    const handleCreate = () => {
        if (!title.trim()) {
            alert('Chapter title is required');
            return;
        }


        // Call the mutation to create chapter
        createChapterMutation.mutate({ title, audio_url: audioUrl }, {
            onSuccess: (data: unknown) => {
                // onCreate?.(data.title, data.description ?? '');
                setTitle('');
                setAudioUrl('');
                onClose();
            },
            onError: (error: unknown) => {
                alert('Failed to create chapter. Please try again.');
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Create New Chapter
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
                        label="chapter Title"
                        placeholder="Enter chapter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        sx={{ ...inputStyles }}
                    />
                    <Typography variant="body2" color="textSecondary">
                        Chapters help organize your book into logical parts.
                    </Typography>
                    <MediaUpload
                        accept="audio"
                        initialUrl={audioUrl}
                        onFileSelect={(url) => setAudioUrl(url)}
                    />

                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleCreate}
                    sx={{ backgroundColor: '#4B2E2E', '&:hover': { backgroundColor: '#3b2525' } }}
                >
                    Create Chapter
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEditChapter;
