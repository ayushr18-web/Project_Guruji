"use client"

import { useParams, useRouter } from "next/navigation";
import { useGetCategories } from "../../../../../../hooks/useBook";
import { Loader } from "lucide-react";
import { useEditStory, useGetStoryData } from "../../../../../../hooks/useStories";
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
    const updateStoryMutation = useEditStory(storyId);

    const handleSubmit = (data: any) => {

        updateStoryMutation.mutate({...data, tags: data?.tags?.split(","), category_id: data?.category}, {
            onSuccess: () => {
                router.push("/admin/stories");
            },
            onError: (err) => {
                console.error("Failed to create Story:", err);
            },
        });
    };

    return (
        <>
            {(isFetching || updateStoryMutation.isPending) ? <Loader /> : <AddEditStory isLoading={false} onSubmit={handleSubmit} initialData={storyData} categories={categories} />}
        </>
    )
}
export default EditBook;
