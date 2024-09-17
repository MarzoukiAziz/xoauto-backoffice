import React, { Fragment, useEffect } from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from 'src/store/notification/NotificationSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const { active, title, subtitle, severity, customColor } = useSelector((state) => state.notification);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setActive(false));
  };

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        dispatch(setActive(false));
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [active, dispatch]);

  return (
    <Fragment>
      <Snackbar
        open={active}
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
            backgroundColor: customColor || '',
          }}
        >
          <AlertTitle>{title}</AlertTitle>
          {subtitle}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Notification;
