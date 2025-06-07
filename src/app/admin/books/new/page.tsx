"use client"

import AddEditForm from "../../components/AddEditForm";
import { useCreateBook } from "../../../../../hooks/useBook";

const New = () => {
    const { mutate: createBook, isPending, isSuccess, isError, error } = useCreateBook();

    const handleSubmit = (data: any) => {
        console.log("Form submitted with data:", data);

        createBook(data, {
            onSuccess: () => {
                console.log("Book created successfully!");
                // Optional: redirect, reset form, show toast, etc.
            },
            onError: (err) => {
                console.error("Failed to create book:", err);
            },
        });
    };

    return (
        <AddEditForm onSubmit={handleSubmit} isLoading={isPending} />
    );
};

export default New;
