import * as React from 'react';
import { useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Button } from '@mui/material';
const parseUrl = require('parse-url');


export default function BookDetail() {
  const url = parseUrl(window.location.href);
  const book = url.query;
  console.log(book)
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }; 

  return (
    <div>
      <header className="App-header" >
      <h1 style={{textTransform:'uppercase'}}>Book Details</h1>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{width:'50%',backgroundColor:'rgba(85, 87, 82,0.75)',color:'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{backgroundColor:'rgba(158,6,4,0.8)'}}
        ><div style={{width:'82%',display:'flex',flexDirection:'row'}}>
            <MenuBookIcon sx={{alignSelf:'center',fontSize:50,marginRight:3}}/>
          <Typography sx={{  flexShrink: 0,fontSize:30,alignSelf:'center' }}>
            {book.name.toUpperCase()}
          </Typography>
        </div>
          <Typography sx={{alignSelf:'center'}}>View Book Details</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor:'rgba(85, 87, 82,0.75)'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <text style = {{margin:10,fontSize:20,textTransform:'uppercase'}}>
                        Author : {book.author}
                    </text>
                    <text style = {{margin:10,fontSize:20,textTransform:'uppercase'}}>
                        Borrowed by : {book.borrowed} 
                    </text>
                    <text style = {{margin:10,fontSize:20,textTransform:'uppercase'}}>
                        Date Of Borrow : {book.bdate}
                    </text>
                    <text style = {{margin:10,fontSize:20,textTransform:'uppercase'}}>
                        Date Of Return : {book.rdate}
                    </text>
            </div>
        </AccordionDetails>
      </Accordion>
      <div style={{marginTop:30}}>
        {book.borrowed === "--" ? <Button 
        variant="outlined" 
        style={{
            padding:10, 
            color:'white',
            fontSize:15,width:150,
            backgroundColor:'rgba(158,6,4,0.8)', 
            borderColor:'white',
            borderWidth:1
        }}
            onClick={()=>{window.location.href="/select_student?book="+book.id+"&bname="+book.name}}
        >
            Borrow
        </Button>
        :
        <></>}
      </div>
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
