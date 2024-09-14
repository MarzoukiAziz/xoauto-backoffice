import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { ArticleType } from 'src/types/blog';

interface StateType {
  articles: ArticleType[];
  recentArticles: ArticleType[];
  articleSearch: string;
  sortBy: string;
  selectedArticle: ArticleType | null;
}

const initialState = {
  articles: [],
  recentArticles: [],
  articleSearch: '',
  sortBy: 'newest',
  selectedArticle: null,
};

export const ArticleSlice = createSlice({
  name: 'Article',
  initialState,
  reducers: {
    getArticles: (state: StateType, action) => {
      state.articles = action.payload;
    },
    getArticle: (state: StateType, action: PayloadAction<ArticleType>) => {
      state.selectedArticle = action.payload;
    },
  },
});

export const { getArticles, getArticle } = ArticleSlice.actions;

// const API_URL = process.env.REACT_APP_API_URL;

const API_URL = 'http://localhost:5000/api/v1';

export const fetchArticles =
  (category?: string, keywords?: string, size = 10, page = 1) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await axios.get(`${API_URL}/article`, {
          params: {
            category,
            keywords,
            size,
            page,
          },
        });
        dispatch(getArticles(response.data.articles));
      } catch (err) {
        throw new Error();
      }
    };

export const fetchArticle = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/article/${id}`);
    dispatch(getArticle(response.data));
  } catch (err) {
    throw new Error();
  }
};

export default ArticleSlice.reducer;
