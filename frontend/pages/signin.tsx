import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { login } from '../services/AuthService';
import { useMutation, UseMutationResult } from 'react-query';
import { FormData, ILogin } from '../types/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://kartaca.com/en/">
        Your Website
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const router = useRouter();
  const {
    mutate,
    isLoading,
    isError,
  }: UseMutationResult<ILogin, Error, FormData> = useMutation<
    ILogin,
    Error,
    FormData
  >(async ({ email, password }) => login(email, password), {
    onSuccess: (data) => {
      console.log(data);
      Cookies.set('user', JSON.stringify(data));
      router.push('/');
    },
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(({ email, password }) => {
    let userData = { email: email, password: password };
    mutate(userData);
  });

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Login Page</title>
      </Head>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                {...register('email')}
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoFocus
              />
              <TextField
                {...register('password')}
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
              />
              {isLoading && <h1>An error occurred</h1>}
              {isError && <h1>There is no such a user</h1>}

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                style={{ backgroundColor: 'black' }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
