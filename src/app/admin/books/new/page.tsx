"use client"

import AddEditForm from "../../components/AddEditForm";
import { useCreateBook, useGetCategories } from "../../../../../hooks/useBook";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const New = () => {
    const router = useRouter();
    const { mutate: createBook, isPending } = useCreateBook();

    const { data: categories } = useGetCategories('BOOK');

    const handleSubmit = (data: any) => {

        createBook({...data, tags: data?.tags?.split(","), category_id: data?.category}, {
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
       { isPending ? <Loader /> :  <AddEditForm onSubmit={handleSubmit} isLoading={isPending} categories={categories}/> }
       </>
    );
};

export default New;
