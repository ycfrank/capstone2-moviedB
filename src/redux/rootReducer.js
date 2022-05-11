import { combineReducers } from "redux";
import userReducer from "./userReducer";
import favoriteReducer from "./favorite/favoriteReducer";
import searchReducer from "./search/searchReducer";
import listReducer from "./handleOpen/listReducer";


const rootReducer = combineReducers({
  user: userReducer,
  favorite: favoriteReducer,
  results: searchReducer,
  open: listReducer
});

export default rootReducer;
