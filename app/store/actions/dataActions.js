import axios from "axios";
import { API_BASE_URL } from "../utils";
import {
  LOGIN_SUCCESS, LOGIN_FAILURE,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  RESET_STORE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_SUCCESS,
  USER_SUCCESS,
  USER_FAILURE
} from "../reducerTypes";
import { AUTH_TOKEN } from "../utils";

export const fetchData = () => async (dispatch) => {
  dispatch({ type: "FETCH_DATA_REQUEST" });

  try {
    console.log("abcdefghij");
    const data = {
      a: "1234",
      v: "23466",
    };
    dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
  }
};



export const register =
  ({ data }) =>
    async (dispatch) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
        return response;

      } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.response });
        return error;
      }
    };

export const logIn =
  ({ data }) =>
    async (dispatch) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        return response;

      } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.response });
        return error;
      }
    };

export const getUser =
  () =>
    async (dispatch, getState) => {
      try {

        const state = getState();
        const authToken = state?.data?.loginData?.data?.access_token
        console.log("authToken?", authToken)
        const response = await axios.get(`${API_BASE_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        dispatch({ type: USER_SUCCESS, payload: response.data });
        return response;

      } catch (error) {
        dispatch({ type: USER_FAILURE, payload: error.response });
        return error;
      }
    };






export const logout = () => ({
  type: LOGOUT_SUCCESS,
});

export const resetStore = () => ({
  type: RESET_STORE,
});