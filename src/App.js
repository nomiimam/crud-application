import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React,{useState} from "react";
import { v4 as uuidv4 } from 'uuid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState('');
  const [userDetails, setUserDetails] = useState([])
  const [editStatus, setEditStatus] = useState('add')
  const [id, setId] = useState('')

  // Submit Button function
  const submit = ()=>{
    if(name, email, phone, place){
      if(editStatus === "add"){
        let details ={
          id: uuidv4(),
          name, email, phone, place,
        }
        setUserDetails([...userDetails, details])
      }else if(editStatus === "edit"){
        let editedDetailupdate = userDetails.filter(item => item.id != id)
        let editedDetail = {
          id, name, email, phone, place,
        }
        setUserDetails([...editedDetailupdate, editedDetail])
      }
      setName('')
      setEmail('')
      setPhone('')
      setPlace('')
      setEditStatus("add")
    }
    else {
      alert("Please fill all TextFields")
    }
  }
  // Delete Record Button Function
  const deleteDetails = (id) => {
    console.log(id)
    let userDetailsUpdate = userDetails.filter(item => item.id != id )
      setUserDetails(userDetailsUpdate)
  }
  //  Edit Record Button Function
  const editDetails = (id) => {
      console.log(id)
      let editDetailsUpdate = userDetails.filter(item => item.id == id )
      console.log(editDetailsUpdate)
      setName(editDetailsUpdate[0].name)
      setEmail(editDetailsUpdate[0].email)
      setPhone(editDetailsUpdate[0].phone)
      setPlace(editDetailsUpdate[0].place)
      setId(editDetailsUpdate[0].id) 
      setEditStatus("edit")    
  }
  console.log(userDetails)

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CRUD Application
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <br />
      <br />
      <Box
        style={{ display: "flex", justifyContent: "center" }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 628,
            height: 250,
          },
        }}
      >
        <Paper elevation={3} style={{display:"flex", flexDirection:"column", alignItems:"center" , justifyContent:"space-around", padding:"30px"}}>
          <div>
            <TextField label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />
            <TextField style={{marginLeft: "30px"}} label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
            <TextField label="Phone" variant="outlined" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <TextField style={{marginLeft: "30px"}} label="Place" variant="outlined" value={place} onChange={(e)=>setPlace(e.target.value)} />
          </div>
          <div>
          <Button variant="contained" onClick={ ()=>submit() }>Submit</Button>
          </div>
        </Paper>

      </Box>
<br/>

      
      <div style={{display:"flex", justifyContent:"center"}}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Place</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {userDetails.length > 0 ? userDetails.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.place}</TableCell>

              <TableCell align="right"><Button variant="contained" onClick={()=>editDetails(row.id)}>Edit</Button></TableCell>
              <TableCell align="right"><Button variant="contained" onClick={()=>deleteDetails(row.id)}>Delete</Button></TableCell>
              
            </TableRow>
          )) :<span >Records not available.</span>
        }
        </TableBody>
      </Table>
    </TableContainer>
    
      </div>
      
    </div>
  );
}

export default App;
