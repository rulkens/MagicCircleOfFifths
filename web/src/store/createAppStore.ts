import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

/**
 * Builds a store with the effects layer attached.
 *
 * A factory rather than a module-level singleton so a test can stand up an
 * isolated store, and so the saga middleware is created per store — a shared
 * one would leak watchers between them.
 */
export function createAppStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault().concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
}

export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore['dispatch'];
