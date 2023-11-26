import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import { Details } from '@mui/icons-material';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  let navigate = useNavigate()
  let initialValue;
  if (localStorage.getItem("User") === null) {
    initialValue = [];
  } else {
    initialValue = JSON.parse(localStorage.getItem("User"));
  }
  const [value, setValue] = useState(initialValue);
  // const [selectedImage, setSelectedImage] = useState(null)
  const [user, setUser] = useState();
  
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }
  console.log(user,'user')
  // const handleFileChange = (event) => {
  //   setSelectedImage(event.target.files[0]);
  // };
  // console.log(selectedImage);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUserId = value.length === 0 ? 1 : value[value.length - 1].u_id + 1;

    console.log(newUserId,'newUserId');

    const details = {
      u_id: newUserId,
      ...user
    };

    

    // Use the previous value and update it with the new details
    const updatedValue = [...value, details];
    setValue(updatedValue);

    // Store the updated value in local storage
    localStorage.setItem("User", JSON.stringify(updatedValue));
    await navigate('/view');
  };


  console.log(value);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Insertion Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} encType='multipart/form-data'>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="text"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone number"
              type="number"
              autoComplete="tel"
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email ID"
              type="email"
              autoComplete="email"
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
              autoComplete="street-address"
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
              Insert
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={'/view'}>
                  <Button variant='outlined' color='secondary' fullWidth>
                    View Documents
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}