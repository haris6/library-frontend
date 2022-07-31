import * as React from 'react';
import { useState,useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../App.css';
import axios from 'axios';

const columns = [
  { id: 'id', label: 'No.', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'author', label: 'Author', minWidth: 100 },
  { id: 'borrowed', label: 'Borrowed By', minWidth: 100 },
  { id: 'bdate', label: 'Borrow Date', minWidth: 100 },
  { id: 'rdate', label: 'Date of Return', minWidth: 100 }
];

function createData(id,name, author, borrowed, bdate, rdate) {
  if(borrowed == null){
    borrowed = "--";
  }
  if(bdate == null){
    bdate = "--";
  }
  if(rdate == null){
    rdate = "--";
  }
  return { id,name, author, borrowed, bdate, rdate };
}

export default function BooksList() {
  const [rows,setRows] = useState([]);
  var data = []

  useEffect(()=>{
    axios.get('http://localhost:4000/books/getbooks').then((response)=>{
      var res = response.data;
      for(var i = 0; i < res.length ; i++){
        const obj = res[i];
        data.push(createData(obj.id,obj.name,obj.author,obj.last_name));
      }      
      setRows(data);
    });
  });

  return (
    <div>
      <header className="App-header" >
        <h1>Books</h1>
        <Paper sx={{ width: '70%', overflow: 'hidden',backgroundColor:'rgba(85, 87, 82,0.75)', }}>
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="sticky table" >
              <TableHead >
                <TableRow >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align='center'
                      style={{ minWidth: column.minWidth ,maxWidth:column.maxWidth, fontSize:22, fontWeight:'bold', backgroundColor:'rgba(158,6,4)',color:'white'  }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
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
        </Paper>
     </header>
    </div>
  );
}
