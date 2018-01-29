import { combineReducers } from 'redux';
import modal from './reducers/modal'
import sidebar from "./reducers/sidebar";

export default combineReducers({
  modal,
  sidebar
});
