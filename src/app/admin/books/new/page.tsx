"use client"

import AddEditForm from "../../components/AddEditForm";
import { useCreateBook, useGetCategories } from "../../../../../hooks/useBook";
import { useRouter } from "next/navigation";

const New = () => {
    const router = useRouter();
    const { mutate: createBook, isPending, isSuccess, isError, error } = useCreateBook();

    const { data: categories } = useGetCategories();

    const handleSubmit = (data: any) => {

        createBook({...data, tags: data?.tags?.split(","), category_id: data?.category_id}, {
            onSuccess: () => {
                router.push("/admin/books");
            },
            onError: (err) => {
                console.error("Failed to create book:", err);
            },
        });
    };

    return (
        <AddEditForm onSubmit={handleSubmit} isLoading={isPending} categories={categories}/>
    );
};

export default New;
