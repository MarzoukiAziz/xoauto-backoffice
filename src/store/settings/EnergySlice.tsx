import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { EnergyType } from 'src/types/settings/energy';

interface StateType {
  energies: EnergyType[];
}

const initialState: StateType = {
  energies: [],
};

export const EnergySlice = createSlice({
  name: 'Energy',
  initialState,
  reducers: {
    getEnergies: (state, action: PayloadAction<any>) => {
      state.energies = action.payload;
    },
    addEnergy: (state, action: PayloadAction<EnergyType>) => {
      state.energies.push(action.payload);
    },
    deleteEnergy: (state, action: PayloadAction<string>) => {
      state.energies = state.energies.filter((energy) => energy._id !== action.payload);
    },
  },
});

export const { getEnergies, addEnergy, deleteEnergy } = EnergySlice.actions;

const AD_API_URL = process.env.REACT_APP_AD_API_URL;

// Fetch energies from the API
export const fetchEnergies = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${AD_API_URL}/settings/energies`);
    dispatch(getEnergies(response.data));
  } catch (err) {
    throw new Error('Failed to fetch energies');
  }
};

// Add a new energy
export const addNewEnergy = (newEnergy: EnergyType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${AD_API_URL}/settings/energies`, newEnergy);
    dispatch(addEnergy(response.data));
  } catch (err) {
    throw new Error('Failed to add new energy');
  }
};

// Delete a energy
export const deleteSelectedEnergy = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${AD_API_URL}/settings/energies/${id}`);
    dispatch(deleteEnergy(id));
  } catch (err) {
    throw new Error('Failed to delete energy');
  }
};

export default EnergySlice.reducer;
