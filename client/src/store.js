import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Let store be undefined initially, and initialize it later based on the environment
let store;

function initStore(initialState) {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
            }),
        devTools: process.env.NODE_ENV !== 'production',
    });
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState);

    // If there's preloaded state and an existing store, merge them
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        store = undefined; // reset the store so it's created anew
    }

    // For SSR and SSG, always create a new store
    if (typeof window === 'undefined') return _store;

    // For the client, reuse the store if it's already created
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}

export default store;
