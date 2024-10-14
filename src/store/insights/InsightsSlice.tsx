import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardHighlightsType } from '../../types/insights';
import { AppDispatch } from 'src/store/Store';
import axios from 'src/utils/axios';

interface StateType {
  dashboardHighlights: DashboardHighlightsType;
}

const initialState: StateType = {
  dashboardHighlights: {
    newUsers: 0,
    activeUsersLast30Days: 0,
    newArticlesLast30Days: 0,
    articleViewsLast30Days: 0,
    newAdsLast30Days: 0,
    adViewsLast30Days: 0,
  },
};

export const InsightsSlice = createSlice({
  name: 'Insights',
  initialState,
  reducers: {
    getDashboardHighlights: (state, action: PayloadAction<DashboardHighlightsType>) => {
      state.dashboardHighlights = action.payload;
    },
  },
});

export const { getDashboardHighlights } = InsightsSlice.actions;
const USER_API_URL = process.env.REACT_APP_USER_API_URL;

export const fetchDashboardHighlights = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${USER_API_URL}/insights/dashboard-highlights`);
    dispatch(getDashboardHighlights(response.data));
  } catch (err) {
    throw new Error();
  }
};

export default InsightsSlice.reducer;
