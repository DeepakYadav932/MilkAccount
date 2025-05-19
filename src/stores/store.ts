import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice'
import { toastReducer } from './toast/toastSlice'
import { appStateReducer } from './app-state/app-state-slice'
import { salesReducer } from './sales/salesSlice'

export const store = configureStore({
  reducer: {
   user: userReducer,
   toast: toastReducer,
   appState: appStateReducer,
   sales: salesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch