import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import useAuth from 'src/guards/authGuard/UseAuth';
import { showNotification } from 'src/store/notification/NotificationSlice';
import { dispatch } from 'src/store/Store';
import { useNavigate } from 'react-router';

type AuthTwoStepsProps = {
  phone: string;
};

const AuthTwoSteps = ({ phone }: AuthTwoStepsProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { confirmPhone } = useAuth();
  const navigate = useNavigate();

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputCode = event.target.value;

    // Allow only digits and limit to 6 characters
    if (/^\d{0,6}$/.test(inputCode)) {
      setCode(inputCode);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (code.length !== 6) {
      setError('Please enter a 6-digit code.');

      return;
    }
    setError('');
    if (await confirmPhone(phone, code)) {
      dispatch(
        showNotification({
          title: 'Success',
          subtitle: 'Phone verified!',
          severity: 'success',
        }),
      );
      navigate('/auth/login', { replace: true });
    } else {
      dispatch(
        showNotification({
          title: 'Error',
          subtitle: 'Code incorrect!',
          severity: 'error',
        }),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mt={4}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="code">Type your 6 digits security code</CustomFormLabel>
          <TextField
            id="code"
            variant="outlined"
            fullWidth
            value={code}
            onChange={handleCodeChange}
            error={!!error} // Show error if exists
            helperText={error} // Display the error message
          />
        </Stack>
        <Button color="primary" variant="contained" size="large" fullWidth type="submit">
          Verify My Account
        </Button>
      </Box>
    </form>
  );
};

export default AuthTwoSteps;
