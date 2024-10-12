import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { ModelType } from 'src/types/settings/model';

interface NewAdStateType {
  newAds: ModelType[];
  selectedNewAd: ModelType | null;
  count: number;
  sortBy: string;
}

const initialState: NewAdStateType = {
  newAds: [],
  selectedNewAd: null,
  count: 0,
  sortBy: 'newest',
};

export const NewAdSlice = createSlice({
  name: 'NewAd',
  initialState,
  reducers: {
    getNewAds: (state, action: PayloadAction<any>) => {
      state.newAds = action.payload.models;
      state.count = action.payload.count;
    },
    getNewAd: (state, action: PayloadAction<ModelType>) => {
      state.selectedNewAd = action.payload;
    },
    addNewAd: (state, action: PayloadAction<ModelType>) => {
      state.newAds.push(action.payload);
    },
    updateNewAd: (state, action: PayloadAction<ModelType>) => {
      state.selectedNewAd = action.payload;
    },
    deleteNewAd: (state, action: PayloadAction<string>) => {
      state.newAds = state.newAds.filter((newAd) => newAd._id !== action.payload);
    },
  },
});

export const { getNewAds, getNewAd, addNewAd, updateNewAd, deleteNewAd } = NewAdSlice.actions;

const API_URL = process.env.REACT_APP_API_URL;

export const fetchNewAds =
  (size = 10, page = 1, sort = 'desc') =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${API_URL}/new-ads/search`, {
        params: { size, page, sort },
      });
      dispatch(getNewAds(response.data));
    } catch (err) {
      throw new Error('Failed to fetch new ads');
    }
  };

export const fetchNewAd = (brand: string, model: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/new-ads/brand`, {
      params: { brand, model },
    });
    dispatch(getNewAd(response.data.ads[0]));
  } catch (err) {
    throw new Error('Failed to fetch new ad');
  }
};

export const addNewAdItem = (newAd: ModelType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${API_URL}/new-ads`, newAd);
    dispatch(addNewAd(response.data));
  } catch (err) {
    throw new Error('Failed to add new ad');
  }
};

export const updateNewAdById = (updatedNewAd: ModelType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/new-ads/${updatedNewAd._id}`, updatedNewAd);
    dispatch(updateNewAd(response.data));
  } catch (err) {
    throw new Error('Failed to update new ad');
  }
};

export const deleteSelectedNewAd = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/new-ads/${id}`);
    dispatch(deleteNewAd(id));
  } catch (err) {
    throw new Error('Failed to delete new ad');
  }
};

export default NewAdSlice.reducer;
