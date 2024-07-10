import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk'; // Middleware for async actions
import rootReducer from './reducers';
// import { configureStore } from "@reduxjs/toolkit";

// export const store = createStore(rootReducer, applyMiddleware(thunk));
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: rootReducer,
//     devTools: process.env.NODE_ENV !== 'production', // Enable only in development
//   });
//export default store;

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
