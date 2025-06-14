"use client";

import React, { useState } from 'react';
import { useDeleteTeaching, useGetTeachings } from '../../../../hooks/useTeachings';
import { ROWS_PER_PAGE } from '../../../../constants/book';
import ActionMenu from '../components/BookListMenu';
import { Column, GenericTable } from '../../../../components/Table';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { formatDateToDDMMYYYY } from '../../../../lib/utils';


const TeachingsPage = () => {
    const [page, setPage] = useState(0);
    const { data, isFetching, refetch } = useGetTeachings({ skip: page * ROWS_PER_PAGE, limit: ROWS_PER_PAGE });
    const router = useRouter();
    const deleteBookMutation = useDeleteTeaching();
    const handleDelete = (id: string) => {
        deleteBookMutation.mutate(id, {
            onSuccess: () => {
                console.log("Teaching deleted successfully");
                refetch();
            },
            onError: (error) => {
                console.error("Failed to delete teaching:", error);
            },
        });
    };

    const teachingsColumn: Column<any>[] = [
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
        { key: 'type', label: 'Type', render: (row) => <span>{row.content_type}</span> },
        { key: 'status', label: 'Status', render: (row) => <span>{row.status}</span> },
        { key: 'created', label: 'Created at', render: (row) => <span>{formatDateToDDMMYYYY(row.created_at)}</span> },
        {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
                <ActionMenu
                    onEdit={() => router.push(`/admin/teachings/edit/${row.id}`)}
                    onDelete={() => handleDelete(row.id)}
                    onView={() => router.push(`/books/${row.id}`)}
                />
            )
        }
    ];

    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
         <div>
      <div className="flex items-center justify-between px-6 py-4 bg-[#fdf8ea] rounded-md">
        <h1 className="text-2xl font-bold text-black">Manage Teachings</h1>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-black bg-[#f9f5e9] border-[#eae4d4] hover:bg-[#f0ebda] transition" onClick={() => router.push(`/admin/teachings/new`)}>
            <Plus className="w-4 h-4" />
            Add New Teaching
          </button>
        </div>
      </div>
      <GenericTable<any>
        columns={teachingsColumn}
        rows={data?.items || []}
        page={page}
        totalCount={data?.total_count || 0}
        rowsPerPage={ROWS_PER_PAGE}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
    )
}
export default TeachingsPage;