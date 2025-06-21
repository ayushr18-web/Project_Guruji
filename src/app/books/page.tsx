"use client";

import React, { useState } from "react";
import { Loader } from "lucide-react";
import { useBooks, useGetCategories } from "../../../hooks/useBook";
import { ROWS_PER_PAGE } from "../../../constants/book";
import BookCard from "./components/BookCard";
import { IBook } from "../../../types/books";

const BooksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories } = useGetCategories('BOOK');

  const { data: books, isFetching } = useBooks({
    skip: 0,
    limit: ROWS_PER_PAGE,
    category_id: selectedCategory ?? undefined,
  });

  return (
    <div className="container mx-auto p-4">
      <h4 className="text-2xl font-bold mb-4">E-Books</h4>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === null
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>

        {categories?.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat.id
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center h-20">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books?.items?.map((book: IBook) => (
            <>
             <BookCard key={book.id} book={book} category={categories?.filter((cat) => cat.id === book.category_id)?.[0] || {}}/>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
