'use client';

import React, { useState } from 'react';
import { GenericTable, Column } from '../../../../components/Table';
import ActionMenu from '../components/BookListMenu';
import { useRouter } from 'next/navigation';
import { ROWS_PER_PAGE } from '../../../../constants/book';
import { useDeleteFestival, useGetFestivals } from '../../../../hooks/useFestivals';


const FestivalsTable = () => {
    const [page, setPage] = useState(0);
    const { data, isFetching } = useGetFestivals({ skip: page * ROWS_PER_PAGE, limit: ROWS_PER_PAGE });
    const router = useRouter();

   const deleteFestivalMutation = useDeleteFestival();

    const handleDelete = (id: string) => {
        deleteFestivalMutation.mutate(id, {
            onSuccess: () => {
                console.log("Festival deleted successfully");
            },
            onError: (error) => {
                console.error("Failed to delete Festival:", error);
            },
        });
    };


    const booksColumns: Column<any>[] = [
        {
            key: 'name',
            label: 'Name',
            render: (row) => (
                <div className="flex items-center gap-2">
                    {row.cover_image_url && <img
                        src={row.cover_image_url}
                        alt={row.title}
                        className="w-8 h-8 rounded object-cover"
                    />}
                    <span className="text-sm font-medium text-gray-900">{row.name}</span>
                </div>
            ),
        },
        { key: 'hindu_month', label: 'Hindu Month', render: (row) => <span>{row.hindu_month}</span> },
        { key: 'start_date', label: 'Start Date', render: (row) => <span>{row.start_date}</span> },
        { key: 'end_date', label: 'End Date', render: (row) => <span>{row.end_date}</span> },
        {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
                <ActionMenu
                    onEdit={() => router.push(`/admin/books/edit/${row.id}`)}
                    onDelete={() => handleDelete(row.id)}
                    onView={() => router.push(`/books/${row.id}`)}
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
                <h1 className="text-2xl font-bold text-black">All Festivals</h1>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-black bg-[#f9f5e9] border-[#eae4d4] hover:bg-[#f0ebda] transition" onClick={() => router.push(`/admin/festivals/new`)}>
                        Add Festival
                    </button>
                </div>
            </div>
            {deleteFestivalMutation.isPending ? <>Deleting....</> : <GenericTable<any>
                columns={booksColumns}
                rows={data?.items || []}
                page={page}
                totalCount={data?.total_count || 0}
                rowsPerPage={ROWS_PER_PAGE}
                onPageChange={(newPage) => setPage(newPage)}
            />}
        </div>
    );
};

export default FestivalsTable;
