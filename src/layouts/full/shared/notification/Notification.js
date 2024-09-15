import * as React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const Notification = ({ title, subtitle, severity = 'info', customColor = '' }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleClick();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{
            width: '100%',
            color: 'white',
            backgroundColor: customColor || '', // Apply custom color if provided
          }}
        >
          <AlertTitle>{title}</AlertTitle>
          {subtitle}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Notification;
