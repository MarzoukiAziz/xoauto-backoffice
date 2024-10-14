import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { AdType } from 'src/types/ad';

// Define the state interface
interface AdStateType {
  ads: AdType[];
  selectedAd: AdType | null;
  count: number;
  sortBy: string;
}

// Initial state
const initialState: AdStateType = {
  ads: [],
  selectedAd: null,
  count: 0,
  sortBy: 'newest',
};

// Create the slice
export const AdSlice = createSlice({
  name: 'Ad',
  initialState,
  reducers: {
    getAds: (state, action: PayloadAction<any>) => {
      state.ads = action.payload.ads;
      state.count = action.payload.count;
    },
    getAd: (state, action: PayloadAction<AdType>) => {
      state.selectedAd = action.payload;
    },
    addAd: (state, action: PayloadAction<AdType>) => {
      state.ads.push(action.payload);
    },
    updateAd: (state, action: PayloadAction<AdType>) => {
      state.selectedAd = action.payload;
    },
    deleteAd: (state, action: PayloadAction<string>) => {
      state.ads = state.ads.filter((ad) => ad._id !== action.payload);
    },
  },
});

// Export actions
export const { getAds, getAd, addAd, updateAd, deleteAd } = AdSlice.actions;

// API URL
const AD_API_URL = process.env.REACT_APP_AD_API_URL;

// Fetch ads from the API
export const fetchAds =
  (uid = '', size = 10, page = 1, sort = 'desc') =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${AD_API_URL}/ads/search`, {
        params: { size, page, sort, includeViews: true, uid },
      });
      dispatch(getAds(response.data));
    } catch (err) {
      throw new Error('Failed to fetch ads');
    }
  };

// Fetch a specific ad by ID
export const fetchAdById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${AD_API_URL}/ads/${id}`, {
      params: { view: false, includeViews: true },
    });
    dispatch(getAd(response.data));
  } catch (err) {
    throw new Error('Failed to fetch ad');
  }
};

// Add a new ad
export const addNewAd = (newAd: AdType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${AD_API_URL}/ads`, newAd);
    dispatch(addAd(response.data));
  } catch (err) {
    throw new Error('Failed to add new ad');
  }
};

// Update an existing ad
export const updateAdById = (updatedAd: AdType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${AD_API_URL}/ads/${updatedAd._id}`, updatedAd);
    dispatch(updateAd(response.data));
  } catch (err) {
    throw new Error('Failed to update ad');
  }
};

// Delete an ad
export const deleteSelectedAd = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${AD_API_URL}/ads/${id}`);
    dispatch(deleteAd(id));
  } catch (err) {
    throw new Error('Failed to delete ad');
  }
};

export default AdSlice.reducer;
