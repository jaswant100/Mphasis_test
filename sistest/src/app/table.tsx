import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

/* type Repo = {
    name: string;
    stargazers_count: number;
  };
   
  export const getServerSideProps: GetServerSideProps<{
    repo: Repo;
  }> = async () => {
    const res = await fetch('https://api.github.com/repos/vercel/next.js');
    const repo = await res.json();
    console.log(repo)
    return { props: { repo } };
  }; */

interface Column {
    id: 'name' | 'age' | 'gender' | 'phone' | 'dob';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'age', label: 'Age', minWidth: 100 },
    {
        id: 'gender',
        label: 'Gender',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'dob',
        label: 'Dob',
        minWidth: 170,
        align: 'right'
    },
];

interface Data {
    name: string,
    age: number,
    gender: string,
    phone: string,
    dob: any
}

function createData(
    name: string,
    age: number,
    gender: string,
    phone: string,
    dob: any
): Data {
    //const density = population / size;
    return { name, age, gender, phone, dob };
}

const rows = [
    createData('Terry', 50, "male", "+63 791 675 8914", "2000-12-25"),
];

export default function ColumnGroupingTable( {repo}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(repo)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        {/*             <TableRow>
              <TableCell align="center" colSpan={2}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow> */}
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
             <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> 
        </Paper>
    );
}