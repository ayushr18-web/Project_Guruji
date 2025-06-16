"use client"

import { useGetCategories } from "../../../../../hooks/useBook";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import AddEditCollection from "../components/AddEditCollection";
import { useCreateCollection } from "../../../../../hooks/useCollections";

const New = () => {
    const router = useRouter();
    const { mutate: createCollection, isPending } = useCreateCollection();

    const { data: categories } = useGetCategories('BOOK');

    const handleSubmit = (data: any) => {

        createCollection({...data, category_id: data?.category}, {
            onSuccess: () => {
                router.push("/admin/collections");
            },
            onError: (err) => {
                console.error("Failed to create Collection:", err);
            },
        });
    };

    return (
       <>
       { isPending ? <Loader /> :  <AddEditCollection onSubmit={handleSubmit} isLoading={isPending} categories={categories}/> }
       </>
    );
};

export default New;
