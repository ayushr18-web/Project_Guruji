"use client"

import AddEditForm from "@/app/admin/components/AddEditForm";
import { useParams, useRouter } from "next/navigation";
import { useEditBook, useGetBookData, useGetCategories } from "../../../../../../hooks/useBook";
import { Loader } from "lucide-react";
import AddEditAudiobook from "../../components/AddEditAudiobook.tsx";

const EditBook = () => {
    const params = useParams();
    const bookId = params.id as string;
    const router = useRouter();
    if (!bookId) {
        return <div>Book ID not found</div>;
    }
    const { data: bookData, isFetching } = useGetBookData(bookId);
    const { data: categories } = useGetCategories('BOOK');
    const updateBookMutation = useEditBook(bookId);

    const handleSubmit = (data: any) => {

        updateBookMutation.mutate({...data, category_id: data?.category, book_type: 'AUDIO'}, {
            onSuccess: () => {
                router.push("/admin/audiobooks");
            },
            onError: (err) => {
                console.error("Failed to create book:", err);
            },
        });
    };

    return (
        <>
            {(isFetching || updateBookMutation.isPending) ? <Loader /> : <AddEditAudiobook isLoading={false} onSubmit={handleSubmit} initialData={bookData} categories={categories} />}
        </>
    )
}
export default EditBook;
