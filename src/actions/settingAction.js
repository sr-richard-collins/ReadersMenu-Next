// actions.js

import axios from '../config/';

export const FETCH_SETTING_REQUEST = 'FETCH_SETTING_REQUEST';
export const FETCH_SETTING_SUCCESS = 'FETCH_SETTING_SUCCESS';
export const FETCH_SETTING_FAILURE = 'FETCH_SETTING_FAILURE';

// Action creators
export const fetchSettingRequest = () => ({
  type: FETCH_SETTING_REQUEST,
});

export const fetchSettingSuccess = (setting) => ({
  type: FETCH_SETTING_SUCCESS,
  payload: setting,
});

export const fetchSettingFailure = (error) => ({
  type: FETCH_SETTING_FAILURE,
  payload: error,
});

// Async action creator to fetch setting
export const fetchSetting = () => {
  return async (dispatch) => {
    //dispatch(fetchSettingRequest());
    try {
      const response = await axios.get('/api/user/setting'); // Replace with your API endpoint
      dispatch(fetchSettingSuccess(response.data));
    } catch (error) {
      dispatch(fetchSettingFailure(error.message));
    }
  };
};
