import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'; // defaults to localStorage for web
import { thunk } from 'redux-thunk';

import rootReducer from './reducers'; // Import your root reducer

// Configuration for redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with thunk middleware and persisted reducer
const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
