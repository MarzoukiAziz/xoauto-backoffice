import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { NewSettingsType } from 'src/types/settings/new';

interface StateType {
  settings: NewSettingsType;
}

const initialState: StateType = {
  settings: {
    brands: [],
  },
};

export const NewSettingsSlice = createSlice({
  name: 'NewSettings',
  initialState,
  reducers: {
    setNewSettings: (state, action: PayloadAction<any>) => {
      state.settings = action.payload;
    },
  },
});

export const { setNewSettings } = NewSettingsSlice.actions;

const NEWAD_API_URL = process.env.REACT_APP_NEWAD_API_URL;

// Fetch settings from the API
export const fetchNewSettings = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${NEWAD_API_URL}/settings/new`);
    dispatch(setNewSettings(response.data));
  } catch (err) {
    throw new Error('Failed to fetch settings');
  }
};

// Update settings
export const updateNewSettings =
  (newNewSettings: NewSettingsType) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(`${NEWAD_API_URL}/settings/new`, newNewSettings);
      dispatch(setNewSettings(response.data));
    } catch (err) {
      throw new Error('Failed to update settinfs');
    }
  };

export default NewSettingsSlice.reducer;
