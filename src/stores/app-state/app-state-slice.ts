import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isSidebarOpened: boolean,
  isAddingRecord: boolean,
  isEditingRecord: boolean,
  isDeleteConfirmationModalOpen: boolean
}

const initialState: AppState = {
  isSidebarOpened: false,
  isAddingRecord: false,
  isEditingRecord: false,
  isDeleteConfirmationModalOpen: false
}

export const AppStateSlice = createSlice({
  name: 'app-state',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpened = true
    },
    closeSidebar: (state) => {
      state.isSidebarOpened = false
    },
    showAddRecordModal: (state, action: PayloadAction<boolean>) => {
      state.isAddingRecord = action.payload
    },
    showEditRecordModal: (state, action: PayloadAction<boolean>) => {
      state.isEditingRecord = action.payload
    },
    setOpenDeleteConfirmation(state, action: PayloadAction<boolean>) {
      state.isDeleteConfirmationModalOpen = action.payload
    }
  }
})

export const { openSidebar, closeSidebar, showAddRecordModal, showEditRecordModal, setOpenDeleteConfirmation } = AppStateSlice.actions
export const appStateReducer = AppStateSlice.reducer