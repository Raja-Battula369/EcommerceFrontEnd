import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import dataStoredReducer from './redux/features.js';
import { BrowserRouter as Router } from 'react-router-dom';

const persistConfigure = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfigure, dataStoredReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);
