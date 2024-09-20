import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import BlogReducer from './blog/BlogSlice';
import ArticleCatgoryReducer from './blog/ArticleCatgorySlice';
import UserReducer from './user/UserSlice';
import AdReducer from './ad/AdSlice';
import NotificationReducer from './notification/NotificationSlice';
import InshightsReducer from './inshights/InshightsSlice';
import { combineReducers } from 'redux';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    notification: NotificationReducer,
    blogReducer: BlogReducer,
    articleCatgoryReducer: ArticleCatgoryReducer,
    userReducer: UserReducer,
    adReducer: AdReducer,
    inshightsReducer: InshightsReducer
  },
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  notification: NotificationReducer,
  blogReducer: BlogReducer,
  articleCatgoryReducer: ArticleCatgoryReducer,
  userReducer: UserReducer,
  adReducer: AdReducer,
  inshightsReducer: InshightsReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
