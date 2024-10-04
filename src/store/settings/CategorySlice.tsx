import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { CategoryType } from 'src/types/settings/category';

interface StateType {
  categories: CategoryType[];
}

const initialState: StateType = {
  categories: [],
};

export const CategorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    getCategories: (state, action: PayloadAction<any>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<CategoryType>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category._id !== action.payload);
    },
  },
});

export const { getCategories, addCategory, deleteCategory } = CategorySlice.actions;

const API_URL = process.env.REACT_APP_API_URL;

// Fetch categories from the API
export const fetchCategories = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/settings/categories`);
    dispatch(getCategories(response.data));
  } catch (err) {
    throw new Error('Failed to fetch categories');
  }
};

// Add a new category
export const addNewCategory = (newCategory: CategoryType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${API_URL}/settings/categories`, newCategory);
    dispatch(addCategory(response.data));
  } catch (err) {
    throw new Error('Failed to add new category');
  }
};

// Delete a category
export const deleteSelectedCategory = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/settings/categories/${id}`);
    dispatch(deleteCategory(id));
  } catch (err) {
    throw new Error('Failed to delete category');
  }
};

export default CategorySlice.reducer;
