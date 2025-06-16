"use client"

import { useParams, useRouter } from "next/navigation";
import { useGetBookData, useGetCategories } from "../../../../../../hooks/useBook";
import { Loader } from "lucide-react";
import { useEditTeaching, useGetTeachingData } from "../../../../../../hooks/useTeachings";
import AddEditTeaching from "../../components/AddEditTeaching";

const EditTeaching = () => {
    const params = useParams();
    const teachingId = params.id as string;
    const router = useRouter();
    if (!teachingId) {
        return <div>Book ID not found</div>;
    }
    const { data: teachingsData, isFetching } = useGetTeachingData(teachingId);
    const { data: categories } = useGetCategories('BOOK');
    const updateBookMutation = useEditTeaching(teachingId);

    const handleSubmit = (data: any) => {

        updateBookMutation.mutate({...data, tags: data?.tags?.split(","), category_id: data?.category}, {
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
            {(isFetching || updateBookMutation.isPending) ? <Loader /> : <AddEditTeaching isLoading={false} onSubmit={handleSubmit} initialData={teachingsData} categories={categories} />}
        </>
    )
}
export default EditTeaching;
