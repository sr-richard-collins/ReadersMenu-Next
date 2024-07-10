// actions.js

import axios from '../config/';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_HOME_POSTS_SUCCESS = 'FETCH_HOME_POSTS_SUCCESS';
export const FETCH_HOME_POSTS_FAILURE = 'FETCH_HOME_POSTS_FAILURE';
export const FETCH_SPOTLIGHT = 'FETCH_SPOTLIGHT';

export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchHomePostsSuccess = (posts) => ({
  type: FETCH_HOME_POSTS_SUCCESS,
  payload: posts,
});

export const fetchSpotlight = (posts) => ({
  type: FETCH_SPOTLIGHT,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const fetchHomePostsFailure = (error) => ({
  type: FETCH_HOME_POSTS_FAILURE,
  payload: error,
});

export const fetchPostsByCategory = (categoryId) => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const response = await axios.get(`/api/user/posts?category=${categoryId}`);
      dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};

export const fetchHomePosts = (categoryId) => {
  return async (dispatch) => {
    // dispatch(fetchPostsRequest());
    try {
      const response = await axios.get(`/api/user/homePosts`);
      dispatch(fetchHomePostsSuccess(response.data));
    } catch (error) {
      dispatch(fetchHomePostsFailure(error.message));
    }
  };
};

export const fetchTodaySpotlight = () => {
  return async (dispatch) => {
    //dispatch(fetchPostsRequest());
    try {
      const response = await axios.get(`/api/user/spotlight`);
      dispatch(fetchSpotlight(response.data));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};
