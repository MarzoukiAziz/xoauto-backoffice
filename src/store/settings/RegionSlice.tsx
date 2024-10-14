import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { RegionType } from 'src/types/settings/region';

interface StateType {
  regions: RegionType[];
}

const initialState: StateType = {
  regions: [],
};

export const RegionSlice = createSlice({
  name: 'Region',
  initialState,
  reducers: {
    getRegions: (state, action: PayloadAction<any>) => {
      state.regions = action.payload;
    },
    addRegion: (state, action: PayloadAction<RegionType>) => {
      state.regions.push(action.payload);
    },
    deleteRegion: (state, action: PayloadAction<string>) => {
      state.regions = state.regions.filter((region) => region._id !== action.payload);
    },
  },
});

export const { getRegions, addRegion, deleteRegion } = RegionSlice.actions;

const AD_API_URL = process.env.REACT_APP_AD_API_URL;

// Fetch regions from the API
export const fetchRegions = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${AD_API_URL}/settings/regions`);
    dispatch(getRegions(response.data));
  } catch (err) {
    throw new Error('Failed to fetch regions');
  }
};

// Add a new region
export const addNewRegion = (newRegion: RegionType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${AD_API_URL}/settings/regions`, newRegion);
    dispatch(addRegion(response.data));
  } catch (err) {
    throw new Error('Failed to add new region');
  }
};

// Delete a region
export const deleteSelectedRegion = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${AD_API_URL}/settings/regions/${id}`);
    dispatch(deleteRegion(id));
  } catch (err) {
    throw new Error('Failed to delete region');
  }
};

export default RegionSlice.reducer;
