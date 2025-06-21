"use client"

import { useParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import AddEditFestival from "../../components/AddEditFestival";
import { useGetFestivalData, useUpdateFestival } from "../../../../../../hooks/useFestivals";


const EditFestival = () => {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    if (!id) {
        return <div>Festival ID not found</div>;
    }
    const { data: storyData, isFetching } = useGetFestivalData(id);
    const updateFestivalMutation = useUpdateFestival(id);

    const handleSubmit = (data: any) => {

        updateFestivalMutation.mutate({...data }, {
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
            {(isFetching || updateFestivalMutation.isPending) ? <Loader /> : <AddEditFestival isLoading={false} onSubmit={handleSubmit} initialData={storyData} />}
        </>
    )
}
export default EditFestival;
