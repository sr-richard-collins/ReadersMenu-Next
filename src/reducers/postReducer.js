// categoryReducer.js

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_HOME_POSTS_SUCCESS,
  FETCH_HOME_POSTS_FAILURE,
  FETCH_SPOTLIGHT,
} from "../actions/postAction";

const initialState = {
  loading: false,
  error: null,
  posts: [],
  todaySpotlight: null,
  homePosts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case FETCH_HOME_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_HOME_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        homePosts: action.payload,
      };
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SPOTLIGHT:
      return {
        ...state,
        loading: false,
        todaySpotlight: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
