import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardHighlightsType } from '../../types/inshights'
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
    }
};

export const InshightsSlice = createSlice({
    name: 'Inshights',
    initialState,
    reducers: {
        getDashboardHighlights: (state, action: PayloadAction<DashboardHighlightsType>) => {
            state.dashboardHighlights = action.payload;
        },
    },
});

export const { getDashboardHighlights } = InshightsSlice.actions;

const API_URL = 'http://localhost:5000/api/v1';

// const API_URL = process.env.REACT_APP_API_URL;

export const fetchDashboardHighlights = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${API_URL}/inshights/dashboard-highlights`);
        dispatch(getDashboardHighlights(response.data));
    } catch (err) {
        throw new Error();
    }
};

export default InshightsSlice.reducer;
