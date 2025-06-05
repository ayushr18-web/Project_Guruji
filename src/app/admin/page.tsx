"use client";
import { GenericTable } from "../../../components/Table";
import { IBook } from "../../../types/books";

const Admin = () => {
    return (
        <GenericTable<IBook>
            title="All E-books"
            columns={[]}
            rows={[]}
            page={2}
            rowsPerPage={10}
            totalCount={20}
            onPageChange={null}
            onRowsPerPageChange={null}
        />
    );
}
export default Admin;