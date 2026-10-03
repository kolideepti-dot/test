const initialState = { loading: false, token: null, loginError: null };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, loginError: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, token: action.payload };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, loginError: action.payload };
    default:
      return state;
  }
}