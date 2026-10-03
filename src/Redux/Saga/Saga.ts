import { put, takeEvery } from 'redux-saga/effects';
import apiClient from '../../API/API-client';
import { fetchDataSuccess, fetchDataFailure} from '../actions';
import { push } from 'connected-react-router';
import store from '../store';
import LibraryapiClient from '../../API/LibraryAPI-client';

function* fetchDataSaga(action:any): Generator<any, void, any> {
 
  const { key,api,request } = action.payload;
  try { 
    //const response = yield apiClient.get(`/data/${key}`);
    const response = yield apiClient.post(api,request);
   
    yield put(fetchDataSuccess(key, response.data));
  } catch (error:any) {
    console.log(" error > "+error.response.data.code);
    if (error.response && (error.response.data.code === 401 || error.response.data.code === 403)) {
      window.location.href = "/logout"
    } else {
      yield put(fetchDataFailure(key, error));
    }
  }
}


function* fetchLibraryDataSaga(action:any): Generator<any, void, any> {
 
  const { key,api,request } = action.payload;
  try { 
    //const response = yield apiClient.get(`/data/${key}`);
    const response = yield LibraryapiClient.post(api,request);
   
    yield put(fetchDataSuccess(key, response.data));
  } catch (error:any) {
    console.log(" error > "+error.response.data.code);
    if (error.response && (error.response.data.code === 401 || error.response.data.code === 403)) {
      window.location.href = "/logout"
    } else {
      yield put(fetchDataFailure(key, error));
    }
  }
}

export function* watchFetchData() {
  yield takeEvery('FETCH_DATA', fetchDataSaga);
}

export function* watchLibraryFetchData() {
  yield takeEvery('FETCH_LIBRARY_DATA', fetchLibraryDataSaga);
}