export interface IBook {
    id: number;
    title: string;
    author: string;
    category: string;
    type: string;
    published: string;
    actions?: React.ReactNode; // Optional for actions like edit/delete
}