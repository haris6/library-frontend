import * as React from 'react';
import { useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import PeopleIcon from '@mui/icons-material/People';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
var parseUrl = require('parse-url');

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function SetReturnDate() {
  const [value, setValue] = useState(new Date());
  const [open, setOpen] = useState(false);
  const url = parseUrl(window.location.href);
  const finaldata = url.query; 
  const [expanded, setExpanded] = useState(false);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function borrow(){
    if(!(value==null)){
        const bdate = new Date();
        axios.put('http://localhost:4000/books/borrow',{bid:finaldata.book,sid:finaldata.student,bdate:bdate,rdate:value}).then((response)=>{
            setTimeout(() => {
              window.location.href="/books"    
            }, 1500);
        })
    }
  }

  return (
    <div>
      <header className="App-header" >
      <h1 style={{textTransform:'uppercase'}}>Set Return Date</h1>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{width:'50%',backgroundColor:'rgba(85, 87, 82,0.75)',color:'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{backgroundColor:'rgba(158,6,4,0.8)'}}
        >
          <div style={{width:'83%',display:'flex',flexDirection:'row'}}>
            <PeopleIcon sx={{alignSelf:'center',fontSize:50,marginRight:3}}/>
          <Typography sx={{  flexShrink: 0,fontSize:30,alignSelf:'center' }}>
            {finaldata.fname.toUpperCase()+" "+finaldata.lname.toUpperCase()}
          </Typography>
        </div>
          <Typography sx={{alignSelf:'center'}}>Add Return Date</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor:'rgba(85, 87, 82,0.75)'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <text style = {{margin:10,fontSize:20,textTransform:'uppercase'}}>
                    Book Name : {finaldata.bname}
                </text>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    sx={{color:'white'}}
                    label="Set Return Date"
                    value={value}
                    minDate={new Date()}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField sx={{color:'white'}} {...params} />}
                  />
                </LocalizationProvider>
                    
            </div>
        </AccordionDetails>
      </Accordion>
        <Button variant="outlined" style={{
            padding:10, 
            color:'white',
            fontSize:15,width:150,
            backgroundColor:'rgba(158,6,4,0.8)', 
            borderColor:'white',
            borderWidth:2,
            marginTop:30
        }}
            onClick={()=>{handleClick();borrow()}}
        >
            done
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%',backgroundColor:'rgba(158,6,4,0.8)' }}>
                Book Borrowed Successfully
            </Alert>
        </Snackbar>
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
