// settingReducer.js

import {
  FETCH_SETTING_REQUEST,
  FETCH_SETTING_SUCCESS,
  FETCH_SETTING_FAILURE,
} from "../actions/settingAction";

const initialState = {
  setting: [],
  loading: false,
  error: null,
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SETTING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        setting: action.payload,
      };
    case FETCH_SETTING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default settingReducer;
