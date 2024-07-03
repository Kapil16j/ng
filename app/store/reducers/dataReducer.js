import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  RESET_STORE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_SUCCESS,
  USER_FAILURE,

} from "../reducerTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
  isAuthenticated: false,

  registerData: [],
  registerDataError: null,

  loginData: [],
  loginDataError: null,

  userData: [],
  userDataError: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginData: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loginDataError: action.payload,
        isAuthenticated: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        registerData: action.payload,
        error: null,
        isAuthenticated: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registerDataError: action.payload,
        isAuthenticated: false,
      };

      case USER_SUCCESS:
        return {
          ...state,
          userData: action.payload,
          error: null,
          isAuthenticated: false,
        };
      case USER_FAILURE:
        return {
          ...state,
          userDataError: action.payload,
          isAuthenticated: false,
        };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loginData: null,
      };

    case RESET_STORE: // Handle the reset store action
      return initialState;

    default:
      return state;
  }
};

export default dataReducer;
