import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Menu, Avatar, Typography, Divider, Button, IconButton, Stack } from '@mui/material';
import { IconMail } from '@tabler/icons';
import useAuth from 'src/guards/authGuard/UseAuth';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { dispatch } from 'src/store/Store';
import { showNotification } from 'src/store/notification/NotificationSlice';
import { AuthContext } from 'src/guards/jwt/JwtContext';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { logout } = useAuth();
  const { user } = useContext(AuthContext);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (user &&
    <Box>
      <IconButton
        size="large"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={user.avatar ? user.avatar : ProfileImg} alt={"Admin Avatar"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            p: 4,
          },
        }}
      >
        <Typography variant="h5">Admin Profile</Typography>
        {user ? <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar src={user.avatar ? user.avatar : ProfileImg} alt={"Admin Avatar"} sx={{ width: 95, height: 95 }} />
          <Box>
            <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Admin
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <IconMail width={15} height={15} />
              {user.email}
            </Typography>
          </Box>
        </Stack> : ""}
        <Divider />
        <Box mt={2}>
          <Button
            onClick={() => {
              logout();
              dispatch(showNotification({
                title: 'Logout Successfully!',
                subtitle: 'See you soon',
                severity: 'info',
              }));
            }}
            to="/auth/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
