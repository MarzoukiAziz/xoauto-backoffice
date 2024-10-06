import React from 'react';
import { Box, Typography, Button, Divider, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import { registerType } from 'src/types/auth/auth';
import AuthSocialButtons from './AuthSocialButtons';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import useAuth from 'src/guards/authGuard/UseAuth';
import useMounted from 'src/guards/authGuard/UseMounted';

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const mounted = useMounted();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const registerSchema = Yup.object().shape({
    UserName: Yup.string().required('UserName is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    phone: Yup.string()
      .matches(/^\+?\d+$/, 'Phone number must start with a + and contain only numbers')
      .required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      UserName: 'ma9doni',
      email: 'marzouki.mohamedaziz@esprit.tn',
      phone: '+21654136336',
      password: '8FejkPvD1cH8MW51&&',
      submit: null,
    },

    validationSchema: registerSchema,

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        await signup(values.email, values.UserName, values.phone, values.password);
        navigate('/auth/confirm-phone/' + values.phone);
        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(true);
        }
      } catch (err: any) {
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <AuthSocialButtons title="Sign up with" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Box>
        {errors.submit && (
          <Box mt={2}>
            <Alert severity="error">{errors.submit}</Alert>
          </Box>
        )}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Stack mb={3}>
              <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
              <CustomTextField
                id="name"
                variant="outlined"
                fullWidth
                {...getFieldProps('UserName')}
                error={Boolean(touched.UserName && errors.UserName)}
                helperText={touched.UserName && errors.UserName}
              />
              <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <CustomFormLabel htmlFor="phone">Phone Number</CustomFormLabel>
              <CustomTextField
                id="phone"
                variant="outlined"
                fullWidth
                {...getFieldProps('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              <CustomTextField
                id="password"
                variant="outlined"
                fullWidth
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
          </Form>
        </FormikProvider>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
