// actions/watchlist.js
export const fetchWatchlist = () => {
  return async (dispatch) => {
    dispatch({ type: "WATCHLIST_REQUEST" });
    try {
      const res = await fetch("http://localhost:4000/api/watchlist", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` }
      });
      const data = await res.json();
      dispatch({ type: "WATCHLIST_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "WATCHLIST_FAILURE", payload: err.message });
    }
  };
};
