import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { EquipmentType } from 'src/types/settings/equipment';

interface StateType {
  equipments: EquipmentType;
}

const initialState: StateType = {
  equipments: {
    safety: [],
    outdoor: [],
    indoor: [],
    functional: [],
  },
};

export const EquipmentSlice = createSlice({
  name: 'Equipment',
  initialState,
  reducers: {
    setEquipments: (state, action: PayloadAction<any>) => {
      state.equipments = action.payload;
    },
  },
});

export const { setEquipments } = EquipmentSlice.actions;

const API_URL = process.env.REACT_APP_API_URL;

// Fetch equipments from the API
export const fetchEquipments = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/settings/equipments`);
    dispatch(setEquipments(response.data));
  } catch (err) {
    throw new Error('Failed to fetch equipments');
  }
};

// Update equipment
export const updateEquipment = (newEquipments: EquipmentType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/settings/equipments`, newEquipments);
    dispatch(setEquipments(response.data));
  } catch (err) {
    throw new Error('Failed to add new equipment');
  }
};

export default EquipmentSlice.reducer;
