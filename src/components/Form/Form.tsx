import React from 'react';
import  TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import './Form.css';


export default function Form() {
  return (<>
    <h1 className='header'>Please enter all the details</h1>
    <div className='main'>

      

        <form action="">
        <TextField className='textField'
        type='text'
          required
          id="name"
          label="Required"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField className='textField'
        type='tel'
          required
          id="phone"
          label="Required"
          defaultValue="Phone Number"
          variant="filled"
        />
        <TextField className='textField'
        type='email'
          required
          id="email"
          label="Required"
          defaultValue="Email"
          variant="filled"
        />

    <Button variant="contained" color="success" className='textField'>
        Submit
      </Button>

        </form>
    </div>
    <div className='lastBtn'>
    <Button variant="outlined">First page</Button>
    <Button variant="outlined">Second page</Button>
    </div>
    </>
  )
}
