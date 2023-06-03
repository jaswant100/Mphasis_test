import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  fetchdataAsync,
  selectData,
} from './tableSlice'
import styles from './Table.module.css'

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
  firstName: string,
  lastName: string,
  maidenName: string,
  age: number,
  gender: string,
  phone: string,
  dob: any
): Data {
  let name = `${firstName} ${lastName} ${maidenName}`
  return { name, age, gender, phone, dob };
}

function ColumnGroupingTable() {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectData);
  const rows = data?.userdata?.users.map((data1: any) => {
    return createData(data1.firstName, data1.lastName, data1.maidenName, data1.age, data1.gender, data1.phone, data1.birthDate)
  }
  )
  useEffect(() => {
    dispatch(fetchdataAsync())
  }, []);

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
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
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
            {rows && rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
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
        count={100}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ColumnGroupingTable
