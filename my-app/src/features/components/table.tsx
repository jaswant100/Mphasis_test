import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';

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
  id: number,
  name: string,
  age: number,
  gender: string,
  phone: string,
  dob: any
}

function createData(
  id: number,
  firstName: string,
  lastName: string,
  maidenName: string,
  age: number,
  gender: string,
  phone: string,
  dob: any
): Data {
  let name = `${firstName} ${lastName} ${maidenName}`
  return { id, name, age, gender, phone, dob };
}

function ColumnGroupingTable({ data }: any) {
  

  let rows = data?.users.map((data1: any) => {
    return createData(data1.id, data1.firstName, data1.lastName, data1.maidenName, data1.age, data1.gender, data1.phone, data1.birthDate)
  }
  )
  let limit = data ? data?.total : 100

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column,i) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={i===0?{position: 'sticky',left:0,background:'white',minWidth: column.minWidth}:{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={i===0?{position: 'sticky',left:0,background:'white'}:{}}>
                          {i === 0 ? <Link
                            href={{
                              pathname: '/profile',
                              query: { id: row.id }
                            }}
                          >{value}</Link> : value}
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
        count={limit}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ColumnGroupingTable
