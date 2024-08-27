import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';

interface StateType {
  users: any[];
  userSearch: string;
  sortBy: string;
  selectedUser: any;
}

const initialState = {
  users: [],
  userSearch: '',
  sortBy: 'newest',
  selectedUser: null,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    getUsers: (state: StateType, action) => {
      state.users = action.payload;
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

// const API_URL = process.env.REACT_APP_API_URL;

const API_URL = 'http://localhost:5000/api/v1';

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user`);
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
    console.log('deleting ' + id);
    await axios.delete(`${API_URL}/user/${id}`);
    dispatch(deleteUser(id));
  } catch (err: any) {
    throw new Error(err);
  }
};
export const activateUserById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    console.log('deleting ' + id);
    await axios.post(`${API_URL}/user/activate-user/${id}`);
    dispatch(activateUser(id));
  } catch (err: any) {
    throw new Error(err);
  }
};
export default UserSlice.reducer;
