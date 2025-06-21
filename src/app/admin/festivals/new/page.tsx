"use client"

import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import AddEditFestival from "../components/AddEditFestival";
import { useCreateFestival } from "../../../../../hooks/useFestivals";

const New = () => {
    const router = useRouter();
    const { mutate: createFestival, isPending } = useCreateFestival();


    const handleSubmit = (data: any) => {

        createFestival({...data}, {
            onSuccess: () => {
                router.push("/admin/festivals");
            },
            onError: (err) => {
                console.error("Failed to create book:", err);
            },
        });
    };

    return (
       <>
       { isPending ? <Loader /> :  <AddEditFestival onSubmit={handleSubmit} isLoading={isPending}/> }
       </>
    );
};

export default New;
