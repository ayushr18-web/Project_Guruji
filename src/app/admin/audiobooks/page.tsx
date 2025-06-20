'use client';

import React, { useState } from 'react';
import { GenericTable, Column } from '../../../../components/Table';
import { useBooks, useDeleteBook } from '../../../../hooks/useBook';
import ActionMenu from '../components/BookListMenu';
import { useRouter } from 'next/navigation';
import { BookOpen, FileText } from 'lucide-react';
import { ROWS_PER_PAGE } from '../../../../constants/book';


const UserTable = () => {
  const [page, setPage] = useState(0);
  const { data, isFetching } = useBooks({ skip: page * ROWS_PER_PAGE, limit: ROWS_PER_PAGE, book_format: "AUDIO" });
  const router = useRouter();

  const deleteBookMutation = useDeleteBook();

  const handleDelete = (id: string) => {
    deleteBookMutation.mutate(id, {
      onSuccess: () => {
        console.log("Book deleted successfully");
      },
      onError: (error) => {
        console.error("Failed to delete book:", error);
      },
    });
  };


  const audiobookColumn: Column<any>[] = [
    {
      key: 'title',
      label: 'Title',
      render: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={row.cover_image_url}
            alt={row.title}
            className="w-8 h-8 rounded object-cover"
          />
          <span className="text-sm font-medium text-gray-900">{row.title}</span>
        </div>
      ),
    },
    { key: 'author_name', label: 'Author', render: (row) => <span>{row.author_name}</span> },
    {
      key: 'tags',
      label: 'Tags',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row?.tags?.map((tag: string, idx: number) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm font-semibold text-black border border-gray-300 rounded-full bg-[#FAF8F6]"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },

    {
      key: 'type',
      label: 'Type',
      render: (row) => (
        <span className="inline-flex items-center gap-2 px-3 py-1 text-sm text-black bg-[#F3F2EE] rounded-full">
          <FileText className="w-1 h-1" />
          {row.book_format}
        </span>
      ),
    },
    { key: 'status', label: 'Published', render: (row) => <span>{row.status}</span> },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <ActionMenu
          onEdit={() => router.push(`/admin/audiobooks/edit/${row.id}`)}
          onDelete={() => handleDelete(row.id)}
          onView={() => router.push(`/audiobooks/${row.id}`)}
        />
      )
    }
  ];

  if (isFetching) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4 bg-[#fdf8ea] rounded-md">
        <h1 className="text-2xl font-bold text-black">Audiobooks Management</h1>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-black bg-[#f9f5e9] border-[#eae4d4] hover:bg-[#f0ebda] transition" onClick={() => router.push(`/admin/audiobooks/new`)}>
            <BookOpen className="w-4 h-4" />
            Add New Audiobook
          </button>
        </div>
      </div>
      {deleteBookMutation.isPending ? <>Deleting....</> : <GenericTable<any>
        columns={audiobookColumn}
        rows={data?.items || []}
        page={page}
        totalCount={data?.total_count || 0}
        rowsPerPage={ROWS_PER_PAGE}
        onPageChange={(newPage) => setPage(newPage)}
      />}
    </div>
  );
};

export default UserTable;
