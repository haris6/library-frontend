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
  { id: 'index', label: 'No.', maxWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'author', label: 'Author', minWidth: 100 },
  { id: 'borrowed', label: 'Borrowed By', minWidth: 100 },
  { id: 'bdate', label: 'Borrow Date', minWidth: 100 },
  { id: 'rdate', label: 'Date of Return', minWidth: 100 }
];

var students = []

function CreateData(index,name, author, borrowed, bdate, rdate,id) {
  if(borrowed == null){
    borrowed = "--";
    bdate = "--";
    rdate = "--";
  }else {
    for(var i = 0 ; i < students.length ; i++){
      if(students[i].id === borrowed){
        borrowed = students[i].first_name+" "+students[i].last_name;
      }
    }
  }
  return { index,name, author, borrowed, bdate, rdate,id };
}


export default function BooksList() {
  const [rows,setRows] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:4000/students/getstudents').then((response)=>{
      var res = response.data;   
      students = res;
    })
  },[])

  useEffect(()=>{
    var data = []
    axios.get('http://localhost:4000/books/getbooks').then((response)=>{
      var res = response.data;
      for(var i = 0; i < res.length ; i++){
        const obj = res[i]; 
        data.push(CreateData(i+1,obj.name,obj.author,obj.borrowed_by,obj.date_of_borrow,obj.expected_date_of_return,obj.id));
      }
      setRows(data);          
    });
  },[]);
  
  return (
    <div>
      <header className="App-header" >
        <h1 style={{textTransform:'uppercase'}}>Books</h1>
        <Paper sx={{ width: '90%', overflow: 'hidden',backgroundColor:'rgba(85, 87, 82,0.75)', }}>
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
                    return(
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={()=>{window.location.href="/book_detail?id="+row.id+"&name="+row.name+"&author="+row.author+"&borrowed="+row.borrowed+"&bdate="+row.bdate+"&rdate="+row.rdate}}>
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
