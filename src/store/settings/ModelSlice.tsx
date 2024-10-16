import axios from 'src/utils/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import { ModelType } from 'src/types/settings/model';

interface StateType {
  models: ModelType[];
}

const initialState: StateType = {
  models: [],
};

export const ModelSlice = createSlice({
  name: 'Model',
  initialState,
  reducers: {
    getModels: (state, action: PayloadAction<any>) => {
      state.models = action.payload;
    },
    addModel: (state, action: PayloadAction<ModelType>) => {
      state.models.push(action.payload);
    },
    deleteModel: (state, action: PayloadAction<string>) => {
      state.models = state.models.filter((model) => model._id !== action.payload);
    },
  },
});

export const { getModels, addModel, deleteModel } = ModelSlice.actions;

const AD_API_URL = process.env.REACT_APP_AD_API_URL;

// Fetch models from the API
export const fetchModels = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${AD_API_URL}/settings/models/brands`);
    dispatch(getModels(response.data));
  } catch (err) {
    throw new Error('Failed to fetch models');
  }
};

// Add a new model
export const addNewModel = (newModel: ModelType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${AD_API_URL}/settings/models`, newModel);
    dispatch(addModel(response.data));
  } catch (err) {
    throw new Error('Failed to add new model');
  }
};

// Delete a model
export const deleteSelectedModel = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${AD_API_URL}/settings/models/${id}`);
    dispatch(deleteModel(id));
  } catch (err) {
    throw new Error('Failed to delete model');
  }
};

export default ModelSlice.reducer;
