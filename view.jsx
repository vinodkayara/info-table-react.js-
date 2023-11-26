import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SingleView from './singleView' 
import Delete from './deleteCard'
import Update from './update'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {
  const [data,setData]=useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
    const [delete_item,setDelete_item]=useState([]);

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("User")));
    }, [])
    console.log(data)
    const handleSingleView = (id) => {
      console.log(id,9);
      setOpen(true)
      setSelectedUser(id)
    }
    
    const handleDelete = (id) => {
      setOpen2(true)
      setSelectedUser(id)
    }
    const handleUpdate = (id) => {
        setOpen3(true)
        setSelectedUser(id)
        
      }
    ;
    
  const handleClose = () => {setOpen(false);setOpen2(false);setOpen3(false)};
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sl No</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="center" colSpan={3}>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((i,index) => (
            <StyledTableRow key={i.index}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="right">{i.name}</StyledTableCell>
              <StyledTableCell align="right">{i.phone}</StyledTableCell>
              <StyledTableCell align="right">{i.email}</StyledTableCell>
              <StyledTableCell align="right">{i.address}</StyledTableCell>
              <StyledTableCell align="right"><Button variant='outlined' color="secondary" onClick={()=>handleSingleView(i.u_id)}>View</Button></StyledTableCell>
              <StyledTableCell align="right"><Button variant='outlined' color="primary" onClick={()=>handleUpdate(i)}>Update</Button></StyledTableCell>
              <StyledTableCell align="right"><Button variant='outlined' color="error" onClick={()=>handleDelete(i.u_id)}>Delete</Button></StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <SingleView sx={style} selectedUser={selectedUser}/>
      </Modal>
    <Modal
        open={open2}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
        <Delete setData={setData} data={data} sx={style} setOpen2={setOpen2} selectedUser={selectedUser}/></>
      </Modal>
    <Modal
        open={open3}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
            <Update  setData={setData} data={data} setOpen3={setOpen3} selectedUser={selectedUser}/>
        </>
      </Modal>
        <Link to={'/'}>
          <Button variant='outlined' fullWidth sx={{mt:2}}>Insert New</Button>
        </Link>
    </>
  );
}
