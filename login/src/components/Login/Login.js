import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from '@mui/material/Button';
import SpinLoading from '../SpinLoading/SpinLoading'
import axios from 'axios';

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate()
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const[errs] = useState({
    username: '',
    password: '',
  });

  const [spinLoading, setSpinLoading] = useState(false);
  const storageUsername = localStorage.getItem('username');
  const storagePassword = localStorage.getItem('password');
  const [usernameValue, setUsernameValue] = useState(storageUsername ?? '');
  const [passwordValue, setPasswordValue] = useState(storagePassword ?? '');

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //Validate username
    if (!data.get('username').trim()) {
      errs.username = "*Please input your username!";
    }else{
      errs.username = "";
    }

    //Validate password
    if (!data.get('password').trim()) {
      errs.password = "*Please input your password!";
    }else {
      errs.password = "";
    }

    var countErrs = 0;
    if(errs.username !== ""){
      countErrs++;
    }
    if(errs.password !== ""){
      countErrs++;
    }
    if(countErrs !== 0){
      navigate('/');
    }else {
      setSpinLoading(true);
      var login = { username: data.get("username"), password: data.get("password") };

      axios.post("https://english-backend-v2.herokuapp.com/users/authenticate",
        login,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        },
      )
        .then((response) => {
          if(response.status === 200) {
            if(data.get('remember') === 'on'){
              localStorage.setItem("token", response.data.data.token);
              localStorage.setItem("username", response.data.data.username);
              localStorage.setItem("userId", response.data.data.id);
              localStorage.setItem("remember", data.get('remember'));
              localStorage.setItem("fullname", response.data.data.firstName + " " + response.data.data.lastName)
            }else{
              localStorage.setItem("token", response.data.data.token);
              localStorage.setItem("userId", response.data.data.id);
              localStorage.setItem("fullname", response.data.data.firstName + " " + response.data.data.lastName)
              localStorage.removeItem("remember");
              localStorage.removeItem("username");
            }
            setSpinLoading(false);
            navigate("/home");    
          } 
          else {
            setSpinLoading(false);
            alert('Username or password is incorrect!')
            return response.json();
          }
        })
        .catch((err) => {
          alert('Username or password is incorrect!')
          setSpinLoading(false);
          console.log(err);
        })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='spin-loading' style={{ display:spinLoading ? 'block' : 'none' }}>
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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              variant='outlined'
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value = {usernameValue}
              onChange={e=> setUsernameValue(e.target.value)}
              
            />
            {errs.username && <span style={{ width: '100%', display: 'inline-block' ,color: 'red', fontSize: '0.8rem'}}>{errs.username}</span> }

            <TextField
              margin="normal"
              required
              fullWidth
              variant='outlined'
              name="password"
              label="Password"
              type={values.showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={passwordValue}
              onChange={e=> setPasswordValue(e.target.value)}
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
              }}
            />
            {errs.password && <span  style={{ width: '100%', display: 'inline-block' ,color: 'red', fontSize: '0.8rem'}}>{errs.password}</span> }

            <FormControlLabel
              control={<Checkbox id="remember"  name="remember" className='checkbox-remember' color="primary" type="checkbox" />}
              label="Remember me"
            />
            <Button
              type="submit"
              className = 'btn-submit'
              fullWidth
              variant="contained"             
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}