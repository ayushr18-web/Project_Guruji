"use client"

import AddEditForm from "@/app/admin/components/AddEditForm";
import { useParams, useRouter } from "next/navigation";
import { useEditBook, useGetBookData, useGetCategories } from "../../../../../../hooks/useBook";
import { Loader } from "lucide-react";

const EditBook = () => {
    const params = useParams();
    const bookId = params.id as string;
    const router = useRouter();
    if (!bookId) {
        return <div>Book ID not found</div>;
    }
    const { data: bookData, isFetching } = useGetBookData(bookId);
    const { data: categories } = useGetCategories();
    const updateBookMutation = useEditBook(bookId);

    const handleSubmit = (data: any) => {

        updateBookMutation.mutate({...data, tags: data?.tags?.split(","), category_id: data?.category}, {
            onSuccess: () => {
                router.push("/admin/books");
            },
            onError: (err) => {
                console.error("Failed to create book:", err);
            },
        });
    };

    return (
        <>
            {(isFetching || updateBookMutation.isPending) ? <Loader /> : <AddEditForm isLoading={false} onSubmit={handleSubmit} initialData={bookData} categories={categories} />}
        </>
    )
}
export default EditBook;
