'use client';
import React, { useState } from 'react';
import { GenericTable, Column } from '../../components/Table';
import { IBook } from '@/app/types/books';

const UserTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const booksColumns: Column<IBook>[] = [
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'category', label: 'Category' },
    { key: 'type', label: 'Type' },
    { key: 'published', label: 'Published' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <GenericTable<IBook>
      title="All E-Books"
      columns={booksColumns}
      rows={[]}
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={20}
      onPageChange={setPage}
      onRowsPerPageChange={setRowsPerPage}
    />
  );
};

export default UserTable;
