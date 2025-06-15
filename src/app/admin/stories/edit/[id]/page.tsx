"use client"

import { useParams, useRouter } from "next/navigation";
import { useEditBook, useGetCategories } from "../../../../../../hooks/useBook";
import { Loader } from "lucide-react";
import { useGetStoryData } from "../../../../../../hooks/useStories";
import AddEditStory from "../../components/AddEditStory";

const EditBook = () => {
    const params = useParams();
    const storyId = params.id as string;
    const router = useRouter();
    if (!storyId) {
        return <div>Book ID not found</div>;
    }
    const { data: storyData, isFetching } = useGetStoryData(storyId);
    const { data: categories } = useGetCategories('BOOK');
    const updateBookMutation = useEditBook(storyId);

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
            {(isFetching || updateBookMutation.isPending) ? <Loader /> : <AddEditStory isLoading={false} onSubmit={handleSubmit} initialData={storyData} categories={categories} />}
        </>
    )
}
export default EditBook;
