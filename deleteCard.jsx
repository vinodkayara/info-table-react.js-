import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
export default function MediaCard({ setOpen2, selectedUser, data, setData }) {
  console.log(data);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 10,
    p: 1,
  };

  const handleClose = () => {
    setOpen2(false);
  }
  const handleDelete = async (id) => {
    console.log("id : " + id);
    const updatedData = data.filter((e) => e.u_id !== id);
    console.log(updatedData);
    setData(updatedData);
    localStorage.setItem("User", JSON.stringify(updatedData));
    await setOpen2(false);
  }



  return (
    <Card sx={style}>

      <CardContent>
        <h4>Attempting to delete ! </h4>
        <Typography variant="body2" color="text.secondary">
          Are you sure, you want to delete the record ?
        </Typography>
      </CardContent>
      <CardActions sx={{ float: 'right' }}>
        <Button color='error' onClick={() => handleClose()} size="small">Cancel</Button>
        <Button color='primary' onClick={() => handleDelete(selectedUser)} size="small">Yes, Delete</Button>
      </CardActions>
    </Card>
  );
}
