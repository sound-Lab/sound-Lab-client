import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType,
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType,
);

const initialState = {
  isLoading: false,
};

const loading = handleActions(
  {
    [START_LOADING]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [FINISH_LOADING]: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

export default loading;
