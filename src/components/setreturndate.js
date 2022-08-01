import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button } from '@mui/material';
var parseUrl = require('parse-url');


export default function SetReturnDate() {
  const [value, setValue] = useState("");
  const url = parseUrl(window.location.href);
  const finaldata = url.query; 

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <header className="App-header" >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label="Select Return Date"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        <Button variant="outlined" onClick={()=>{}}>done</Button>
      </header>
    </div>
  );
}
