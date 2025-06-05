export interface IBook {
    id: number;
    title: string;
    author: string;
    category: string;
    type: string;
    published: string;
    image_url?: string; // Optional for book cover image
    actions?: React.ReactNode; // Optional for actions like edit/delete
}