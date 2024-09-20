import React, { ChangeEvent, useEffect, useState } from 'react';
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
  MenuItem as SelectMenuItem,
  Box,
  Stack,
  FormControl,
  Select,
  InputLabel,
  TextField,
  InputAdornment,
  SelectChangeEvent,
  Pagination,
} from '@mui/material';
import BlankCard from '../../components/shared/BlankCard';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconDotsVertical, IconEdit, IconSearch, IconTrash } from '@tabler/icons';
import { dispatch, useSelector } from 'src/store/Store';
import { activateUserById, deleteUserById, fetchUsers } from 'src/store/user/UserSlice';
import { UserType } from 'src/types/user';
import { formattedDate } from 'src/utils/usefulFunctions/formattedDate';

type UsersTableProps = {
  role: string
}
const UsersTable = ({ role }: UsersTableProps) => {
  const users: UserType[] = useSelector((state) => state.userReducer.users);
  const usersCount: number = useSelector((state) => state.userReducer.count);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    dispatch(fetchUsers(role, search, pageSize, currentPage, sortOrder));
  }, [role, search, currentPage, pageSize, sortOrder]);

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

  const handleSortOrderChange = (event: SelectChangeEvent<"asc" | "desc">) => {
    const newSortOrder = event.target.value as 'asc' | 'desc';
    setSortOrder(newSortOrder);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box sx={{ paddingBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Sort by</InputLabel>
            <Select value={sortOrder} onChange={handleSortOrderChange}>
              <SelectMenuItem value="desc">Newest</SelectMenuItem>
              <SelectMenuItem value="asc">Oldest</SelectMenuItem>
            </Select>
          </FormControl>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="Search User"
            size="small"
            onChange={handleSearch}
            value={search}
          />
        </Box>
      </Box>
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
                  <Typography variant="h6">Last Login</Typography>
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
                    <Typography variant="subtitle1" color="textSecondary">
                      {user.lastLogin ? formattedDate(user.lastLogin) : "N/A"}
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
          <Pagination
            count={Math.ceil(usersCount / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'center' }}
          />
        </TableContainer>
      </BlankCard>
    </>
  );
};

export default UsersTable;
