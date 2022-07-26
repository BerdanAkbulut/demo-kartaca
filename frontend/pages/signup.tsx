import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import { useForm } from 'react-hook-form';
import { ISignUp } from '../types/types';
import { useMutation, UseMutationResult } from 'react-query';
import { registerAccount } from '../services/AuthService';
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
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>();
  const { mutate, isError }: UseMutationResult<any, Error, ISignUp> =
    useMutation<any, Error, ISignUp>(
      async ({ email, password, firstName, lastName }) =>
        registerAccount(email, firstName, lastName, password),
      {
        onSuccess: () => {
          router.push('/signin');
        },
      }
    );

  const onSubmit = handleSubmit(({ email, password, firstName, lastName }) => {
    let userData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    mutate(userData);
  });

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName', {
                    required: true,
                  })}
                  autoComplete="given-name"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                />
                {errors?.firstName?.type === 'required' && (
                  <span className="text-xs text-red-600">
                    First name is required
                  </span>
                )}
                {errors?.firstName?.type === 'min' && (
                  <span className="text-xs text-red-600">
                    First name is at least 2 characters
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName', {
                    required: true,
                  })}
                  required
                  fullWidth
                  label="Last Name"
                  autoComplete="family-name"
                />
                {errors?.lastName?.type === 'required' && (
                  <span className="text-xs text-red-600">
                    Last name is required
                  </span>
                )}
                {errors?.lastName?.type === 'min' && (
                  <span className="text-xs text-red-600">
                    Last name is at least 2 characters
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email', { required: true })}
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                />
                {errors?.email?.type === 'required' && (
                  <span className="text-xs text-red-600">
                    Email is required
                  </span>
                )}
                {errors?.email?.type === 'min' && (
                  <span className="text-xs text-red-600">
                    Email is at least 5 characters
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password', { required: true })}
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
                {errors?.password?.type === 'required' && (
                  <span className="text-xs text-red-600">
                    Password is required
                  </span>
                )}
                {errors?.password?.type === 'min' && (
                  <span className="text-xs text-red-600">
                    Password is at least 8 characters
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
              {isError && (
                <span className="mt-6 text-center text-sm text-red-700">
                  An Error Happened.
                </span>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              style={{ backgroundColor: 'black' }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
