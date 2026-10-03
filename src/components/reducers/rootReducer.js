// rootReducer.js
import { combineReducers } from "redux";
import authReducer from "./auth";     // handles login/logout state
import watchlistReducer from "./watchlist"; // handles watchlist state

const rootReducer = combineReducers({
  auth: authReducer,
  watchlist: watchlistReducer
});

export default rootReducer;
