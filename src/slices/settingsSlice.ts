import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { COLOR, ColorType, VARIANT, VariantType } from "../types.ts";

interface ISettingsState {
  buttonColor: ColorType,
  buttonVariant: VariantType,
}

const initialState: ISettingsState = {
  buttonColor: COLOR.DEFAULT,
  buttonVariant: VARIANT.SOLID,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setButtonColor: (state, action: PayloadAction<ColorType>) => {
      state.buttonColor = action.payload;
    },
    setButtonVariant: (state, action: PayloadAction<VariantType>) => {
      state.buttonVariant = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const {
  setButtonColor,
  setButtonVariant,
  resetSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
