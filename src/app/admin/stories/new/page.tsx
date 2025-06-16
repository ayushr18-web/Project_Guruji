"use client"

import {  useRouter } from "next/navigation";
import { useGetCategories } from "../../../../../hooks/useBook";
import AddEditStory from "../components/AddEditStory";
import { useCreateStory } from "../../../../../hooks/useStories";

const EditBook = () => {
    const router = useRouter();

    const { data: categories } = useGetCategories('BOOK');
    const { mutate: createStory, isPending } = useCreateStory();

    const handleSubmit = (data: any) => {

        createStory({...data, tags: data?.tags?.split(","), category_id: data?.category}, {
            onSuccess: () => {
                router.push("/admin/stories");
            },
            onError: (err) => {
                console.error("Failed to create book:", err);
            },
        });
    };

    return (
        <>
             <AddEditStory isLoading={false} onSubmit={handleSubmit} initialData={{}} categories={categories} />
        </>
    )
}
export default EditBook;
