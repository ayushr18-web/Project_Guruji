"use client"

import AddEditForm from "@/app/admin/components/AddEditForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IBook } from "../../../../../../types/books";

const EditBook = () => {
    // get the book ID from the URL params
    const params = useParams();
    const bookId = params.id;
    const [bookData, setBookData] = useState<IBook>({} as IBook);

    useEffect(() => {
        // Fetch the book data from the API using the bookId
        const fetchBookData = async () => {
            try {
                const response = await fetch(`/api/books/${bookId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }
                const data: IBook = await response.json();
                setBookData(data);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchBookData();
    }, []);

    return (
        <AddEditForm initialData={bookData}/>
    )
}
export default EditBook;
