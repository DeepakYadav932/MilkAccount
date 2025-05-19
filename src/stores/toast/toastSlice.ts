import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Severity {
  INFO = "info",
  ERROR = "error",
  WARN = "warn",
  SUCCESS = "success",
}

interface Toast {
  show: boolean;
  title: string;
  message: string;
  severity: Severity
}

export type ToastProps = Omit<Toast, 'show'>

const initialState: Toast = {
  show: false,
  message: '',
  title: '',
  severity: Severity.INFO
}

export const ToastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Toast>) => {
      state.message = action.payload.message;
      state.title = action.payload.title;
      state.severity = action.payload.severity
      state.show = true
    },
    hideToast: (state) => {
      state.show = false
      state.message = '';
      state.title = '';
      state.severity = Severity.INFO
    }
  }
})

export const { showToast, hideToast } = ToastSlice.actions
export const toastReducer = ToastSlice.reducer