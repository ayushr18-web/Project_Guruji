'use client';
import React from 'react';
import { GenericTable, Column } from '../../../../components/Table';
import { IBook } from '../../../../types/books';
import { useBooks } from '../../../../hooks/useBook';
import { useBookStore } from '../../../../store/bookStore';
import ActionMenu from '../components/BookListMenu';

const UserTable = () => {

  const { query, rowsPerPage, page, setPage } = useBooks({ page: 1, limit: 10 });
  const books = useBookStore((state) => state.books);
  // const { isLoading, isError, error } = query;
  console.log('Books:', books);

  const booksColumns: Column<IBook>[] = [
    { key: 'title', label: 'Title', render: (row) => <span>{row.title}</span> },
    { key: 'author', label: 'Author', render: (row) => <span>{row.author}</span> },
    { key: 'category', label: 'Category', render: (row) => <div className='p-4 border-radius-2'>{row.category}</div> },
    { key: 'type', label: 'Type', render: (row) => <span>{row.type}</span> },
    { key: 'published', label: 'Published', render: (row) => <span>{new Date(row.published).toLocaleDateString()}</span> },
    { key: 'actions', label: 'Actions', render: (row) => (
      <ActionMenu />
    ) },  
  ];



  return (
    <GenericTable<IBook>
      title="All E-Books"
      columns={booksColumns}
      rows={books}
      page={page}
      totalCount={0}
      rowsPerPage={rowsPerPage}
      onPageChange={setPage}
    />
  );
};

export default UserTable;
