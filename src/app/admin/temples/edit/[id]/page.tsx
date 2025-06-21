"use client"

import { useParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useGetFestivalData, useUpdateFestival } from "../../../../../../hooks/useFestivals";
import AddEditTemple from "../../components/AddEditTemple";
import { useGetTempleData } from "../../../../../../hooks/useTemples";


const EditTemple = () => {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    if (!id) {
        return <div>Temple ID not found</div>;
    }
    const { data: templeData, isFetching } = useGetTempleData(id);
    const updateTempleMutation = useUpdateFestival(id);

    const handleSubmit = (data: any) => {

        updateTempleMutation.mutate({...data }, {
            onSuccess: () => {
                router.push("/admin/temples");
            },
            onError: (err) => {
                console.error("Failed to create Story:", err);
            },
        });
    };

    return (
        <>
            {(isFetching || updateTempleMutation.isPending) ? <Loader /> : <AddEditTemple isLoading={false} onSubmit={handleSubmit} initialData={templeData} />}
        </>
    )
}
export default EditTemple;
