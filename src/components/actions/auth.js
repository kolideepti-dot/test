export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("jwtToken", data.token);
        dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: data.error });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };
};
