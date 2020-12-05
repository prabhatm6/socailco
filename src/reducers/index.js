import { combineReducers } from "redux";
import authReducers from "./authReducers";
import infoReducer from "./info";
import chatReducer from './chatReducer'

export default combineReducers({
  auth: authReducers,
  info: infoReducer,
  chat:chatReducer
});
