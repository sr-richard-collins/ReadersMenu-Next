// reducers/index.js

import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import postReducer from './postReducer';
import settingReducer from './settingReducer';

const rootReducer = combineReducers({
  categories: categoryReducer,
  posts: postReducer,
  setting: settingReducer,
});

export default rootReducer;
