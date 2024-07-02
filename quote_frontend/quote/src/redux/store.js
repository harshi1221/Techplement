import { createStore } from "redux";
import { combineReducer } from "./combineReducer";

// created redux store for allowing the state to be updated with resepect to actions
export const store = createStore(
    combineReducer
)