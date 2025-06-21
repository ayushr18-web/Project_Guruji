"use client"

import { useCreateBook, useGetCategories } from "../../../../../hooks/useBook";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import AddEditAudiobook from "../components/AddEditAudiobook.tsx";

const New = () => {
    const router = useRouter();
    const { mutate: createBook, isPending } = useCreateBook();
    const { data: categories } = useGetCategories('BOOK');

    const handleSubmit = (data: any) => {

        createBook({...data, tags: data?.tags?.split(","), category_id: data?.category, book_type: 'AUDIO'}, {
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
       { isPending ? <Loader /> :  <AddEditAudiobook onSubmit={handleSubmit} isLoading={isPending} categories={categories}/> }
       </>
    );
};

export default New;
