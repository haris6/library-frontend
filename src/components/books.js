import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'author', label: 'Author', minWidth: 100 },
  { id: 'borrowed', label: 'Borrowed By', minWidth: 100 },
  { id: 'bdate', label: 'Borrow Date', minWidth: 100 },
  { id: 'rdate', label: 'Expected Date of Return', minWidth: 100 }
];

function createData(name, author, borrowed, bdate, rdate) {
  return { name, author, borrowed, bdate, rdate };
}

const rows = [
  createData('The Alley', 'John Doe', 'Haris', '2022-11-12','2022-11-18'),
  createData('Alchemist', 'Christian Bale', 'Ahsan', '2022-11-13','2022-11-17'),
  createData('Anatomy', 'roberta', 'Ahsan', '2022-10-11','2022-11-05'),
];

export default function BooksList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <header className="App-header" >
        <h1>Students</h1>
        <Paper sx={{ width: '70%', overflow: 'hidden',backgroundColor:'rgba(85, 87, 82,0.75)', }}>
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="sticky table" >
              <TableHead >
                <TableRow >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align='center'
                      style={{ minWidth: column.minWidth , fontSize:22, fontWeight:'bold', backgroundColor:'rgba(220,8,8,0.6)',color:'white'  }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{backgroundColor:''}}>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={()=>{console.log('click event here')}}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align='center'style={{fontSize:18, color:'white',fontWeight:'bold'}}>
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
            sx={{color:'white'}}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
     </header>
    </div>
  );
}
