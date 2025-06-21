"use client"

import { useParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import AddEditCollection from "../../components/AddEditCollection";
import { useEditCollection, useGetCollectionData } from "../../../../../../hooks/useCollections";

const EditBook = () => {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    if (!id) {
        return <div>Collection ID not found</div>;
    }
    const { data: bookData, isFetching } = useGetCollectionData(id);
    const updateCollectionMutation = useEditCollection(id);

    const handleSubmit = (data: any) => {
        const updatedData = {
            ...data,
            tags: data?.tags.split(",") || []
        };
        delete updatedData.category; // Ensure id is not sent in the update request
        updateCollectionMutation.mutate(updatedData, {
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
            {(isFetching || updateCollectionMutation.isPending) ? <Loader /> : <AddEditCollection isLoading={false} onSubmit={handleSubmit} initialData={bookData} />}
        </>
    )
}
export default EditBook;
