import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { ArticleCategoryType } from 'src/types/blog';

interface StateType {
  categories: ArticleCategoryType[];
}

const initialState: StateType = {
  categories: [],
};

export const ArticleCategorySlice = createSlice({
  name: 'ArticleCategory',
  initialState,
  reducers: {
    getCategories: (state, action: PayloadAction<any>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<ArticleCategoryType>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category._id !== action.payload);
    },
  },
});

export const { getCategories, addCategory, deleteCategory } = ArticleCategorySlice.actions;

const BLOG_API_URL = process.env.REACT_APP_BLOG_API_URL;

// Fetch categories from the API
export const fetchCategories = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${BLOG_API_URL}/settings/article-categories`);
    dispatch(getCategories(response.data));
  } catch (err) {
    throw new Error('Failed to fetch categories');
  }
};

// Add a new category
export const addNewCategory =
  (newCategory: ArticleCategoryType) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`${BLOG_API_URL}/settings/article-categories`, newCategory);
      dispatch(addCategory(response.data));
    } catch (err) {
      throw new Error('Failed to add new category');
    }
  };

// Delete a category
export const deleteSelectedCategory = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${BLOG_API_URL}/settings/article-categories/${id}`);
    dispatch(deleteCategory(id));
  } catch (err) {
    throw new Error('Failed to delete category');
  }
};

export default ArticleCategorySlice.reducer;
