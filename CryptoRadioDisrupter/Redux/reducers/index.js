import { combineReducers } from "redux";
import createCard from "./cardReducer";
import createSeed from "./seedReducer";

export default combineReducers({
  createCard,
  createSeed
});