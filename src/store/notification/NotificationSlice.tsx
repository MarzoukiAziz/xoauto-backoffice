import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateType {
    active: boolean;
    title: string;
    subtitle: string;
    severity: string;
    customColor: string;
}

interface NotificationPayload {
    title: string;
    subtitle: string;
    severity?: string;
    customColor?: string;
}

const initialState: StateType = {
    active: false,
    title: "",
    subtitle: "",
    severity: "info",
    customColor: ""
}

export const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        },

        showNotification: (state, action: PayloadAction<NotificationPayload>) => {
            state.active = true;
            state.title = action.payload.title;
            state.subtitle = action.payload.subtitle;
            state.severity = action.payload.severity || 'info';
            state.customColor = action.payload.customColor || '';
        },

    },
});

export const {
    setActive,
    showNotification
} = NotificationSlice.actions;

export default NotificationSlice.reducer;
