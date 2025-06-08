import React, { JSX } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
// import { useTheme } from '@mui/material/styles';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  title?: string;
  columns: Column<T>[];
  rows: T[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

export const GenericTable = <T extends object>({

  columns,
  rows,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
}: GenericTableProps<T>): JSX.Element => {
  // const theme = useTheme();

  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <Paper color="card" sx={{ backgroundColor: '#fefbf5' }}>
      {/* {title && (
        <Typography variant="h5" component="div" sx={{ padding: 2 }}>
          {title}
        </Typography>
      )} */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key as string}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.key as string}>
                      {column.render ? column.render(row) : (row[column.key] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={() => { }}
        rowsPerPageOptions={[]}
        labelRowsPerPage=""
        labelDisplayedRows={() => ''}
        showFirstButton={false}
        showLastButton={false}
      />

    </Paper>
  );
};
