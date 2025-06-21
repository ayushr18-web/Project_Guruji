'use client';

import React, { useState } from 'react';
import { GenericTable, Column } from '../../../../components/Table';
import ActionMenu from '../components/BookListMenu';
import { useRouter } from 'next/navigation';
import { ROWS_PER_PAGE } from '../../../../constants/book';
import { useDeleteTemple, useGetTemples } from '../../../../hooks/useTemples';


const FestivalsTable = () => {
    const [page, setPage] = useState(0);
    const { data, isFetching } = useGetTemples({ skip: page * ROWS_PER_PAGE, limit: ROWS_PER_PAGE });
    const router = useRouter();

    const deleteTempleMutation = useDeleteTemple();

    const handleDelete = (id: string) => {
        deleteTempleMutation.mutate(id, {
            onSuccess: () => {
                console.log("temples deleted successfully");
            },
            onError: (error) => {
                console.error("Failed to delete temple:", error);
            },
        });
    };


    const templesColumn: Column<any>[] = [
        {
            key: 'name',
            label: 'Name',
            render: (row) => (
                <div className="flex items-center gap-2">
                    {row.cover_image_url && <img
                        src={row.cover_image_url}
                        alt={row.name}
                        className="w-8 h-8 rounded object-cover"
                    />}
                    <span className="text-sm font-medium text-gray-900">{row.name}</span>
                </div>
            ),
        },
        { key: 'main_deity', label: 'Main Deity', render: (row) => <span>{row.main_deity}</span> },
        {
            key: 'place_name',
            label: 'Place',
            render: (row) => (
                <span className="inline-flex items-center gap-2 px-3 py-1 text-sm text-black bg-[#F3F2EE] rounded-full">
                    {row.place_name}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
                <ActionMenu
                    onEdit={() => router.push(`/admin/temples/edit/${row.id}`)}
                    onDelete={() => handleDelete(row.id)}
                    onView={() => router.push(`/temples/${row.id}`)}
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
                <h1 className="text-2xl font-bold text-black">All Temples</h1>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-black bg-[#f9f5e9] border-[#eae4d4] hover:bg-[#f0ebda] transition" onClick={() => router.push(`/admin/temples/new`)}>
                        Add Temple
                    </button>
                </div>
            </div>
            {deleteTempleMutation.isPending ? <>Deleting....</> : <GenericTable<any>
                columns={templesColumn}
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
