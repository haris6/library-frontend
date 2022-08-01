import * as React from 'react';
import { useState,useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const parseUrl = require('parse-url');

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


export default function StudentDetail() {
  const [open, setOpen] = useState(false);
  const [books,setBooks] = useState([]);
  const url = parseUrl(window.location.href);
  const user = url.query;
  const id = parseInt(user.id);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(()=>{
    axios.post('http://localhost:4000/students/borrowed',{id:id}).then((response)=>{
      var res = response.data;     
      setBooks(res);
    });
  },[]);
  
  function returnBook(id){
    axios.put('http://localhost:4000/students/returnbook',{id:id}).then((response)=>{
        console.log(response.data);
        window.location.reload();
    })
  }


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <header className="App-header" >
      <h1 style={{textTransform:'uppercase'}}>Student Details</h1>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{width:'50%',backgroundColor:'rgba(85, 87, 82,0.75)',color:'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{backgroundColor:'rgba(158,6,4,0.8)'}}
        >
          <div style={{width:'80%',display:'flex',flexDirection:'row'}}>
            <PeopleIcon sx={{alignSelf:'center',fontSize:50,marginRight:3}}/>
          <Typography sx={{  flexShrink: 0,fontSize:30,alignSelf:'center' }}>
            {user.fname.toUpperCase()+" "+user.lname.toUpperCase()}
          </Typography>
        </div>
          <Typography sx={{alignSelf:'center'}}>View Borrowed Books</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor:'rgba(85, 87, 82,0.75)'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                {books.map((book) => {
                    return(
                        <div style={{display:'flex',flexDirection:'row',marginTop:5}}>
                            <Button variant="outlined" style={{padding:10,color:'white',fontSize:15,width:200,backgroundColor:'rgba(158,6,4,0.8)', borderColor:'white',borderWidth:2, marginRight:15}} startIcon={<MenuBookIcon/>} >
                                {book.name}
                            </Button>
                            <Button 
                                variant="outlined" 
                                style={{
                                    color:'white',
                                    fontSize:2,
                                    width:10,
                                    backgroundColor:'rgba(158,6,4,0.8)', 
                                    borderColor:'white',
                                    borderWidth:2
                                }}
                                onClick={()=>{returnBook(book.id)}}
                            >
                                <CloseIcon/>
                            </Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    This is a success message!
                                </Alert>
                            </Snackbar>
                        </div>
                    );
                })}
            </div>
        </AccordionDetails>
      </Accordion>
      </header>
    </div>
  );
}
