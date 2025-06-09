"use client";

import React, { useEffect, useState } from "react";

import { Loader } from "lucide-react";
import { useBooks, useGetCategories } from "../../../hooks/useBook";
import { ROWS_PER_PAGE } from "../../../constants/book";
import BookCard from "./components/BookCard";

const BooksPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: books, isFetching } = useBooks({
        skip: 0,
        limit: ROWS_PER_PAGE
    });

    const { data: categories } = useGetCategories();

    return (
        <div className="container mx-auto p-4">
            <h4 className="text-2xl font-bold mb-4">E-Books</h4>

            {isFetching && <Loader />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {books?.items?.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}

            </div>
        </div>
    );
};

export default BooksPage;