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
import { Button } from '@mui/material';
var parseUrl = require('parse-url');

const columns = [
  { id: 'index', label: 'No.', maxWidth: 50 },
  { id: 'fname', label: 'First Name', minWidth: 100 },
  { id: 'lname', label: 'Last Name', minWidth: 100 },
];

function createData(index,fname, lname,id) {
  return { index,fname,lname,id };
}

export default function SelectStudent() {
  const [rows,setRows] = useState([]);
  const url = parseUrl(window.location.href);
  const book = url.query;

  useEffect(()=>{
    var data = []
    axios.get('http://localhost:4000/students/getstudents').then((response)=>{
      var res = response.data;
      for(var i = 0; i < res.length ; i++){
        const obj = res[i];
        data.push(createData(i+1,obj.first_name,obj.last_name,obj.id));
      }      
      setRows(data);
    });
  },[]);
  

  return (
    <div>
      <header className="App-header" >
        <h1 style={{textTransform:'uppercase'}}>Select Student</h1>
        <Paper sx={{ width: '70%', overflow: 'hidden',backgroundColor:'rgba(85, 87, 82,0.75)', }}>
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="sticky table" >
              <TableHead >
                <TableRow >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align='center'
                      style={{ minWidth: column.minWidth ,maxWidth:column.maxWidth, fontSize:22, fontWeight:'bold', backgroundColor:'rgba(158,6,4,0.9)',color:'white'  }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody >
                {rows.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={()=>{window.location.href="/set_return_date?book="+book.book+"&bname="+book.bname+"&student="+row.id+"&fname="+row.fname+"&lname="+row.lname}}>
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
        <Button 
          variant="outlined" 
          style={{
              color:'white',
              fontSize:20,
              width:300,
              backgroundColor:'rgba(158,6,4,0.8)', 
              borderColor:'white',
              borderWidth:1,
              marginTop:50
          }}
          onClick={()=>{window.location.href="/"}}
      >
          Back To Home
      </Button>
     </header>
    </div>
  );
}
