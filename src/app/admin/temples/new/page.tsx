"use client"

import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useCreateFestival } from "../../../../../hooks/useFestivals";
import AddEditTemple from "../components/AddEditTemple";
import { useCreateTemple } from "../../../../../hooks/useTemples";

const New = () => {
    const router = useRouter();
    const { mutate: createTemple, isPending } = useCreateTemple();


    const handleSubmit = (data: any) => {

        createTemple({...data}, {
            onSuccess: () => {
                router.push("/admin/temples");
            },
            onError: (err) => {
                console.error("Failed to create book:", err);
            },
        });
    };

    return (
       <>
       { isPending ? <Loader /> :  <AddEditTemple onSubmit={handleSubmit} isLoading={isPending}/> }
       </>
    );
};

export default New;
