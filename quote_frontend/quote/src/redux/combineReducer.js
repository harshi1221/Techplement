// importing combine reducer function from redux and userreducer function from file
import {combineReducers} from "redux";
import { userReducer } from "./userReducer";

// combining user reducer into single root reducing for easier maintainane
export const combineReducer = combineReducers({userReducer:userReducer})