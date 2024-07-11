// categoryReducer.js

import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_SELECT_CATEGORY_FAILURE,
  FETCH_SELECT_CATEGORY_SUCCESS,
  FETCH_SELECT_CATEGORY_REQUEST,
} from "../actions/categoryAction";

const initialState = {
  categories: [],
  loading: false,
  error: null,
  selectCategory: "",
  posts: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SELECT_CATEGORY_FAILURE:
      return {
        ...state,
      };
    case FETCH_SELECT_CATEGORY_SUCCESS:
        return {
        ...state,
        selectCategory: action.payload,
      };
    case FETCH_SELECT_CATEGORY_REQUEST:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default categoryReducer;
