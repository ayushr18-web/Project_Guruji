'use client';

import React, { useEffect, useState } from 'react';
import { GenericTable, Column } from '../../../../components/Table';
import { useBooks } from '../../../../hooks/useBook';
import { useBookStore } from '../../../../store/bookStore';
import ActionMenu from '../components/BookListMenu';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';
const ROWS_PER_PAGE = 10;

const UserTable = () => {
  const [page, setPage] = useState(0);

  const { data, isFetching } = useBooks({ skip: page * ROWS_PER_PAGE, limit: ROWS_PER_PAGE });

  const books = useBookStore((state) => state.books);
  const setBooks = useBookStore((state) => state.setBooks);
  const router = useRouter();

  useEffect(() => {
    if (!isFetching && data) {
      setBooks(data); 
    }
  }, [data]);

  const handleDelete = (id: string) => {
    console.log(`Delete book with ID: ${id}`);
  };

  const booksColumns: Column<any>[] = [
    { key: 'title', label: 'Title', render: (row) => <span>{row.title}</span> },
    { key: 'author_name', label: 'Author', render: (row) => <span>{row.author_name}</span> },
    { key: 'tags', label: 'Tags', render: (row) => <div className='p-4 border-radius-2'>{row?.tags?.join(',')}</div> },
    { key: 'type', label: 'Type', render: (row) => <span>{row.book_format}</span> },
    { key: 'status', label: 'Published', render: (row) => <span>{row.status}</span> },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <ActionMenu
          onEdit={() => router.push(`/admin/books/edit/${row.id}`)}
          onDelete={() => handleDelete(row.id)}
        />
      )
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4 bg-[#fdf8ea] rounded-md">
      <h1 className="text-2xl font-bold text-black">Books Management</h1>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-black bg-[#f9f5e9] border-[#eae4d4] hover:bg-[#f0ebda] transition" onClick={() => router.push(`/admin/books/new`)}>
          <BookOpen className="w-4 h-4"/>
          Add E-Book
        </button>
      </div>
    </div>
      <GenericTable<any>
        title="All E-Books"
        columns={booksColumns}
        rows={books.items || []}
        page={page}
        totalCount={data?.total_count || 0}
        rowsPerPage={ROWS_PER_PAGE}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default UserTable;
