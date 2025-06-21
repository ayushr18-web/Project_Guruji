"use client"

import { useGetCategories } from "../../../../../hooks/useBook";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import AddEditTeaching from "../components/AddEditTeaching";
import { useCreateTeaching } from "../../../../../hooks/useTeachings";

const New = () => {
    const router = useRouter();
        const { mutate: createTeaching, isPending } = useCreateTeaching();
    
        const { data: categories } = useGetCategories('BOOK');
    
        const handleSubmit = (data: any) => {
            console.log("Form data:", data);
            createTeaching({...data, tags: data?.tags?.split(","), category_id: data?.category}, {
                onSuccess: () => {
                    router.push("/admin/teachings");
                },
                onError: (err) => {
                    console.error("Failed to create book:", err);
                },
            });
        };

    return (
       <>
       { isPending ? <Loader /> :  <AddEditTeaching onSubmit={handleSubmit} isLoading={isPending} categories={categories}/> }
       </>
    );
};

export default New;
