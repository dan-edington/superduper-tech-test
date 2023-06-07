import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './Components/App/AppSlice';

const store = configureStore({
  reducer: {
    app: AppReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
