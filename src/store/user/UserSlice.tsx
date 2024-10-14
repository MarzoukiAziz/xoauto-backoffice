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
  },
});

export const { getUsers, getUser } = UserSlice.actions;

const USER_API_URL = process.env.REACT_APP_USER_API_URL;

export const fetchUsers =
  (keywords?: string, size = 10, page = 1, sort = 'desc') =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${USER_API_URL}/user`, {
        params: {
          keywords,
          size,
          page,
          sort,
        },
      });
      dispatch(getUsers(response.data));
    } catch (err) {
      throw new Error();
    }
  };
export const fetchUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${USER_API_URL}/user/${id}`);
    dispatch(getUser(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};

export default UserSlice.reducer;
