// reducers/watchlist.js
const initialState = { loading: false, list: [], error: null };

export default function watchlistReducer(state = initialState, action) {
  switch (action.type) {
    case "WATCHLIST_REQUEST":
      return { ...state, loading: true };
    case "WATCHLIST_SUCCESS":
      return { ...state, loading: false, list: action.payload };
    case "WATCHLIST_FAILURE":
      return { ...state, loading: false, error: action.payload, list: [] };
    default:
      return state;
  }
}
