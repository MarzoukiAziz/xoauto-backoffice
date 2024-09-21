import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { UserType } from 'src/types/user';

interface StateType {
  users: UserType[];
  userSearch: string;
  sortBy: string;
  selectedUser: UserType | null;
  count: number;
}

const initialState = {
  users: [],
  count: 0,
  userSearch: '',
  sortBy: 'newest',
  selectedUser: null,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    getUsers: (state: StateType, action) => {
      state.users = action.payload.users;
      state.count = action.payload.count;
    },
    getUser: (state: StateType, action) => {
      state.selectedUser = action.payload;
    },
    deleteUser: (state: StateType, action) => {
      const userIndex = state.users.findIndex((user) => user._id === action.payload);
      if (userIndex !== -1) {
        state.users[userIndex].deleted = true;
      }
    },
    activateUser: (state: StateType, action) => {
      const userIndex = state.users.findIndex((user) => user._id === action.payload);
      if (userIndex !== -1) {
        state.users[userIndex].deleted = false;
      }
    },
  },
});

export const { getUsers, getUser, deleteUser, activateUser } = UserSlice.actions;

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = (role?: string, keywords?: string, size = 10, page = 1, sort = "desc") => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      params: {
        role,
        keywords,
        size,
        page,
        sort
      },
    });
    dispatch(getUsers(response.data));
  } catch (err) {
    throw new Error();
  }
};
export const fetchUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`);
    dispatch(getUser(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};
export const deleteUserById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/user/${id}`);
    dispatch(deleteUser(id));
  } catch (err: any) {
    throw new Error(err);
  }
};
export const activateUserById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.post(`${API_URL}/user/activate-user/${id}`);
    dispatch(activateUser(id));
  } catch (err: any) {
    throw new Error(err);
  }
};
export default UserSlice.reducer;
