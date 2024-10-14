import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { ColorType } from 'src/types/settings/color';

interface StateType {
  colors: ColorType[];
}

const initialState: StateType = {
  colors: [],
};

export const ColorSlice = createSlice({
  name: 'Color',
  initialState,
  reducers: {
    getColors: (state, action: PayloadAction<any>) => {
      state.colors = action.payload;
    },
    addColor: (state, action: PayloadAction<ColorType>) => {
      state.colors.push(action.payload);
    },
    deleteColor: (state, action: PayloadAction<string>) => {
      state.colors = state.colors.filter((color) => color._id !== action.payload);
    },
  },
});

export const { getColors, addColor, deleteColor } = ColorSlice.actions;

const AD_API_URL = process.env.REACT_APP_AD_API_URL;

// Fetch colors from the API
export const fetchColors = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${AD_API_URL}/settings/colors`);
    dispatch(getColors(response.data));
  } catch (err) {
    throw new Error('Failed to fetch colors');
  }
};

// Add a new color
export const addNewColor = (newColor: ColorType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${AD_API_URL}/settings/colors`, newColor);
    dispatch(addColor(response.data));
  } catch (err) {
    throw new Error('Failed to add new color');
  }
};

// Delete a color
export const deleteSelectedColor = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${AD_API_URL}/settings/colors/${id}`);
    dispatch(deleteColor(id));
  } catch (err) {
    throw new Error('Failed to delete color');
  }
};

export default ColorSlice.reducer;
