import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  name: "store",
  initialState: {
    ilość: null,
    czy_obok: null,
    sukces: false, // czy potrzebne?
    wybrane_miejsca: [],
    dostepnosc_miejsc: {} // jak przychodzi z api tablica to tablica
  },
  reducer: {
    counter: counterReducer,
  },
});
