// actions.js

import axios from '../config';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const FETCH_SELECT_CATEGORY_FAILURE = 'FETCH_SELECT_CATEGORY_FAILURE';
export const FETCH_SELECT_CATEGORY_SUCCESS = 'FETCH_SELECT_CATEGORY_SUCCESS';
export const FETCH_SELECT_CATEGORY_REQUEST = 'FETCH_SELECT_CATEGORY_REQUEST';

// Action creators
export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

// Async action creator to fetch categories
export const fetchCategories = () => {
  return async (dispatch) => {
    //dispatch(fetchCategoriesRequest());
    try {
      const response = await axios.get('/api/user/categories'); // Replace with your API endpoint
      dispatch(fetchCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error.message));
    }
  };
};

export const fetchSelectCategory = (selectCategory) => ({
  type: FETCH_SELECT_CATEGORY_SUCCESS,
  payload: selectCategory,
});
