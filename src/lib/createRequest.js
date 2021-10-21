import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

function createRequest(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));

    try {
      const response = yield call(request, action.payload);

      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: FAILURE,
        payload: error.response.data,
        error: true,
      });
    }

    yield put(finishLoading(type));
  };
}

export default createRequest;
