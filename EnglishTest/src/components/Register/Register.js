import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useState } from 'react';
import SpinLoading from '../SpinLoading/SpinLoading';

const theme = createTheme();

export default function SignUp() {

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const [spinLoading, setSpinLoading] = useState(false);

  const[errs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  })

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    //Validate firstName
    if (!data.get('firstName').trim()) {
      errs.firstName = "*Please input your first name!";
    } else if (!/^([^0-9]*)$/.test(data.get('firstName')))
     {
      errs.firstName = "*First name can't contain number!";
    } else if (data.get('firstName').trim().length < 2)
     {
      errs.firstName = "*First name should be more than 1 character!";
    }else { 
      errs.firstName = "";
    }

    //Validate lastName
    if (!data.get('lastName').trim()) {
      errs.lastName = "*Please input your last name!";
    } else if (!/^([^0-9]*)$/.test(data.get('lastName')))
     {
      errs.lastName = "*Last name can't contain number!";
    } else if (data.get('lastName').trim().length < 2)
     {
      errs.lastName = "*Last name should be more than 1 character!";
    }else { 
      errs.lastName = "";
    }

    //Validate email address
    const checkmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.get('email').trim()) {
      errs.email = "*Please input your email address!";
    } else if (!checkmail.test(data.get('email'))) {
      errs.email = "*Email address is invalid!";
    }else { 
      errs.email = "";
    }

    //Validate username
    if (!data.get('username').trim()) {
      errs.username = "*Please input your username!";
    } else if (!/^[a-zA-Z0-9]+$/.test(data.get('username'))) {
      errs.username = "*Username can't contain special characters!";
    } else if (data.get('username').trim().length < 5) {
      errs.username = "*Last name should be more than 4 characters!";
    }else { 
      errs.username = "";
    }

    //Validate password
    if (!data.get('password').trim()) {
      errs.password = "*Please input your password!";
    } else if (data.get('password').trim().length < 6) {
      errs.password = "*Last name should be more than 5 characters!";
    }else { 
      errs.password = "";
    }

    var register = {
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
    }
    
    var countErrs = 0;
   
    if(errs.firstName !== "") {
      countErrs++;
    }
    if(errs.lastName !== ""){
      countErrs++;
    }
    if(errs.email !== ""){
      countErrs++;
    }
    if(errs.username !== ""){
      countErrs++;
    }
    if(errs.password !== ""){
      countErrs++;
    }
    console.log(countErrs);

    if(countErrs !== 0 ){
      navigate('/register')
    }else{
      setSpinLoading(true);
      fetch(" https://english-backend-v2.herokuapp.com/users/register", {
        method: "POST",
        body: JSON.stringify(register),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Đăng ký thành công");
            setSpinLoading(false);
            navigate('/');
          } else {
            setSpinLoading(false);
            alert("Đăng ký thất bại");
            navigate("/register");
          }
        }
        )
    }  
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='spin-loading' style={{ display:spinLoading ? 'block' : 'none'}}>
        <SpinLoading />
      </div>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                {errs.firstName && <span style={{ width: '100%', display: 'inline-block' ,color: 'red', fontSize: '0.8rem'}}>{errs.firstName}</span> }
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                {errs.lastName && <span style={{ width: '100%', display: 'inline-block' ,color: 'red', fontSize: '0.8rem'}}>{errs.lastName}</span> }
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {errs.email && <span style={{ width: '100%', display: 'inline-block' ,color: 'red', fontSize: '0.8rem'}}>{errs.email}</span> }
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
                {errs.username && <span style={{ width: '100%', display: 'inline-block' ,color: 'red', fontSize: '0.8rem'}}>{errs.username}</span> }
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={values.showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}w
                />
                {errs.password && <span  style={{ width: '100%', display: 'inline-block' ,color: 'red', fontSize: '0.8rem'}}>{errs.password}</span> }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className = 'btn-submit'
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}