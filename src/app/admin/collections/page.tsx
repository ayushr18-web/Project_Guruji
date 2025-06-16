'use client';

import React, { useState } from 'react';
import { GenericTable, Column } from '../../../../components/Table';
import ActionMenu from '../components/BookListMenu';
import { useRouter } from 'next/navigation';
import { ROWS_PER_PAGE } from '../../../../constants/book';
import { useDeleteCollection, useGetCollections } from '../../../../hooks/useCollections';
import { formatDateToDDMMYYYY } from '../../../../lib/utils';


const CollectionTable = () => {
  const [page, setPage] = useState(0);
  const { data, isFetching, refetch } = useGetCollections({ skip: page * ROWS_PER_PAGE, limit: ROWS_PER_PAGE });
  const router = useRouter();

  const deleteCollectionMutation = useDeleteCollection();

  const handleDelete = (id: string) => {
    deleteCollectionMutation.mutate(id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Failed to delete Collection:", error);
      },
    });
  };


  const collectionsColumn: Column<any>[] = [
    {
      key: 'title',
      label: 'Title',
      render: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={row.cover_image_url}
            alt={row.name}
            className="w-8 h-8 rounded object-cover"
          />
          <span className="text-sm font-medium text-gray-900">{row.name}</span>
        </div>
      ),
    },
    { key: 'description', label: 'Description', render: (row) => <span>{row.description}</span> },

    { key: 'created_at', label: 'Created', render: (row) => <span>{formatDateToDDMMYYYY(row.created_at)}</span> },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <ActionMenu
          onEdit={() => router.push(`/admin/collections/edit/${row.id}`)}
          onDelete={() => handleDelete(row.id)}
          onView={() => router.push(`/collections/${row.id}`)}
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
        <h1 className="text-2xl font-bold text-black">Collections Management</h1>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-black bg-[#f9f5e9] border-[#eae4d4] hover:bg-[#f0ebda] transition" onClick={() => router.push(`/admin/collections/new`)}>
            Add Collection
          </button>
        </div>
      </div>
      {deleteCollectionMutation.isPending ? <>Deleting....</> : <GenericTable<any>
        columns={collectionsColumn}
        rows={data?.items || []}
        page={page}
        totalCount={data?.total_count || 0}
        rowsPerPage={ROWS_PER_PAGE}
        onPageChange={(newPage) => setPage(newPage)}
      />}
    </div>
  );
};

export default CollectionTable;
