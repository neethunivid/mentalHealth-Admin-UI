import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from './Saga/RootSaga';
import rootReducer from './rootReducer';
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['reducer1']
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);  
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
