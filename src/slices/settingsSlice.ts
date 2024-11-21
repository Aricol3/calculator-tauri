import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { COLOR, VARIANT } from "../types.ts";

interface ISettingsState {
  buttonColor: string,
  buttonVariant: string,
}

const initialState: ISettingsState = {
  buttonColor: COLOR.DEFAULT,
  buttonVariant: VARIANT.SOLID,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setButtonColor: (state, action: PayloadAction<any>) => {
      state.buttonColor = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const {
  setButtonColor,
  resetSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
