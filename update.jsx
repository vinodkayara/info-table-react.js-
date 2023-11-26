import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import Card from "@mui/material/Card";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn({ setOpen3, selectedUser, data, setData }) {

  console.log(selectedUser,'selectedUser');
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 10,
    p: 1,
  };
  
  const [updatedUser, setUpdatedUser] = useState(selectedUser);
  const [index, setIndex] = useState('');
  useEffect(()=>{
    const index=(data.findIndex((e) => e.u_id ==selectedUser.u_id))
        setIndex(index);
  },[])
  console.log(index);
  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };
  // const handleFileChange = (event) => {
  //   setSelectedImage(event.target.files[0]);
  // };
  console.log(updatedUser);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedData = [...data];
    updatedData.splice(index, 1, updatedUser);
    console.log(updatedData,9);
    setData(updatedData)
    localStorage.setItem("User",JSON.stringify(updatedData))
    await setOpen3(false);
  };
  const handleClose = () => {
    setOpen3(false);
  };
  return (
      <Card sx={style}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
            <Typography component="h1" variant="h5">
              Update Form
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
              encType="multipart/form-data"
            >
              <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="text"
              autoFocus
              value={updatedUser.name}
            />
              <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              type="email"
              value={updatedUser.email}
            />
            
              <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              type="number"
              id="phone"
              label="phone"
              name="phone"
              autoComplete="phone"
              
              value={updatedUser.phone}
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="address"
              label="address"
              name="address"
              autoComplete="text"
              type="text"
              value={updatedUser.address}
            />
              
              {/* <small>Profile picture</small>
      <TextField
        onChange={handleFileChange}
        margin="normal"
        required
        fullWidth
        name="image"
        type="file"
        autoComplete="off"
      /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button
                    onClick={() => handleClose()}
                    variant="outlined"
                    color="error"
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Card>
  );
}
