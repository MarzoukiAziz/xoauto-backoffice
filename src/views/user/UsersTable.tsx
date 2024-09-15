import React, { useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Box,
  Stack,
} from '@mui/material';
import BlankCard from '../../components/shared/BlankCard';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons';
import { useDispatch, useSelector } from 'src/store/Store';
import { activateUserById, deleteUserById, fetchUsers } from 'src/store/user/UserSlice';
import { userType } from 'src/types/user';
import { orderBy } from 'lodash';

const UsersTable = () => {
  const [anchorEl, setAnchorEl] = React.useState<{ [key: string]: HTMLElement | null }>({});

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    setAnchorEl((prevState) => ({ ...prevState, [userId]: event.currentTarget }));
  };

  const handleClose = (userId: string) => {
    setAnchorEl((prevState) => ({ ...prevState, [userId]: null }));
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUserById(id));
    }
    handleClose(id);
  };

  const handleActivateUser = (id: string) => {
    if (window.confirm('Are you sure you want to activate this user?')) {
      dispatch(activateUserById(id));
    }
    handleClose(id);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filterUsers = (users: userType[], sortBy: string, _cSearch: string) => {
    // SORT BY

    if (sortBy === 'newest') {
      users = orderBy(users, ['createdAt'], ['desc']);
    }
    if (sortBy === 'oldest') {
      users = orderBy(users, ['createdAt'], ['asc']);
    }

    return users;
  };

  const users = useSelector((state) =>
    filterUsers(state.userReduce.users, state.userReduce.sortBy, state.userReduce.userSearch),
  );

  return (
    <BlankCard>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">User</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Pro</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      src={user.avatar ?? img1}
                      alt={user.avatar}
                      sx={{ width: 42, height: 42 }}
                    />
                    <Box>
                      <Typography variant="h6">{user.name}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary">
                    {user.email}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={user.pro ? 'Pro' : 'Particular'}
                    sx={{
                      backgroundColor: user.pro
                        ? (theme) => theme.palette.warning.light
                        : (theme) => theme.palette.primary.light,
                      color: user.pro
                        ? (theme) => theme.palette.warning.main
                        : (theme) => theme.palette.primary.main,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.deleted ? 'Deleted' : 'Active'}
                    sx={{
                      backgroundColor: !user.deleted
                        ? (theme) => theme.palette.success.light
                        : (theme) => theme.palette.error.light,
                      color: !user.deleted
                        ? (theme) => theme.palette.success.main
                        : (theme) => theme.palette.error.main,
                    }}
                  />
                </TableCell>

                <TableCell>
                  <IconButton
                    id="basic-button"
                    aria-controls={anchorEl[user._id] ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={anchorEl[user._id] ? 'true' : undefined}
                    onClick={(e) => handleClick(e, user._id)}
                  >
                    <IconDotsVertical width={18} />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl[user._id]}
                    open={Boolean(anchorEl[user._id])}
                    onClose={() => handleClose(user._id)}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={() => handleClose(user._id)}>
                      <ListItemIcon>
                        <IconEdit width={18} />
                      </ListItemIcon>
                      Edit
                    </MenuItem>
                    {user.deleted ? (
                      <MenuItem onClick={() => handleActivateUser(user._id)}>
                        <ListItemIcon>
                          <IconTrash width={18} />
                        </ListItemIcon>
                        Activate
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={() => handleDeleteUser(user._id)}>
                        <ListItemIcon>
                          <IconTrash width={18} />
                        </ListItemIcon>
                        Delete
                      </MenuItem>
                    )}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default UsersTable;
