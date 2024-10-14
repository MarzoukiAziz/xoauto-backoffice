import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { BrandType } from 'src/types/settings/brand';

interface StateType {
  brands: BrandType[];
}

const initialState: StateType = {
  brands: [],
};

export const BrandSlice = createSlice({
  name: 'Brand',
  initialState,
  reducers: {
    getBrands: (state, action: PayloadAction<any>) => {
      state.brands = action.payload;
    },
    addBrand: (state, action: PayloadAction<BrandType>) => {
      state.brands.push(action.payload);
    },
    deleteBrand: (state, action: PayloadAction<string>) => {
      state.brands = state.brands.filter((brand) => brand._id !== action.payload);
    },
  },
});

export const { getBrands, addBrand, deleteBrand } = BrandSlice.actions;

const AD_API_URL = process.env.REACT_APP_AD_API_URL;

// Fetch brands from the API
export const fetchBrands = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${AD_API_URL}/settings/brands`);
    dispatch(getBrands(response.data));
  } catch (err) {
    throw new Error('Failed to fetch brands');
  }
};

// Add a new brand
export const addNewBrand = (newBrand: BrandType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${AD_API_URL}/settings/brands`, newBrand);
    dispatch(addBrand(response.data));
  } catch (err) {
    throw new Error('Failed to add new brand');
  }
};

// Delete a brand
export const deleteSelectedBrand = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${AD_API_URL}/settings/brands/${id}`);
    dispatch(deleteBrand(id));
  } catch (err) {
    throw new Error('Failed to delete brand');
  }
};

export default BrandSlice.reducer;
