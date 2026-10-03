import { all } from 'redux-saga/effects';
import { watchFetchData } from './Saga';
import { watchLibraryFetchData } from './Saga';

export default function* rootSaga() {
  
  yield all([
    watchFetchData(),
    watchLibraryFetchData()
    // Add more sagas here if needed
  ]);
}
