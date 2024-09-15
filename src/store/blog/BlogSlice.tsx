import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { ArticleType } from 'src/types/blog';
import { Category } from '@mui/icons-material';

interface StateType {
  articles: ArticleType[];
  recentArticles: ArticleType[];
  articleSearch: string;
  sortBy: string;
  selectedArticle: ArticleType | null;
}

const initialState: StateType = {
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
    getArticles: (state, action: PayloadAction<ArticleType[]>) => {
      state.articles = action.payload;
    },
    getArticle: (state, action: PayloadAction<ArticleType>) => {
      state.selectedArticle = action.payload;
    },
    addArticle: (state, action: PayloadAction<ArticleType>) => {
      state.articles.push(action.payload);
    },
    updateArticle: (state, action: PayloadAction<ArticleType>) => {
      state.articles = state.articles.map(article =>
        article._id === action.payload._id ? action.payload : article
      );
    },
    deleteArticle: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter(article => article._id !== action.payload);
    },
  },
});

export const { getArticles, getArticle, addArticle, updateArticle, deleteArticle } = ArticleSlice.actions;

const API_URL = 'http://localhost:5000/api/v1';

// const API_URL = process.env.REACT_APP_API_URL;
// Fetch articles from the API
export const fetchArticles =
  (search?: string, wcategory?: string, size = 10, page = 1) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await axios.get(`${API_URL}/article`, {
          params: {
            search,
            Category,
            size,
            page,
          },
        });
        dispatch(getArticles(response.data.articles));
      } catch (err) {
        throw new Error();
      }
    };

// Fetch a specific article by ID
export const fetchArticle = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/article/${id}`);
    dispatch(getArticle(response.data));
  } catch (err) {
    throw new Error();
  }
};

// Add a new article
export const addNewArticle = (newArticle: ArticleType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${API_URL}/article`, newArticle);
    dispatch(addArticle(response.data));
  } catch (err) {
    throw new Error('Failed to add new article');
  }
};

// Update an existing article
export const updateArticleById = (updatedArticle: ArticleType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/article/${updatedArticle._id}`, updatedArticle);

    dispatch(updateArticle(response.data));
  } catch (err) {
    throw new Error('Failed to update article');
  }
};

// Delete an article
export const deleteSelectedArticle = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/article/${id}`);
    dispatch(deleteArticle(id));
  } catch (err) {
    throw new Error('Failed to delete article');
  }
};

export default ArticleSlice.reducer;
