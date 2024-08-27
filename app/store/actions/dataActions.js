import axios from "axios";

// import { useRouter } from "next/navigation";
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
  USER_FAILURE,
  ALL_SAMPLE_PROPOSALS,
  ALL_SAMPLE_PROPOSALS_FAILURE,
  PROPOSAL_QUESTION,
  PROPOSAL_QUESTION_FAILURE,
  ALL_CHATS,
  ALL_CHATS_FAILURE,
  ALL_MESSAGE_FOR_CHAT,
  ALL_MESSAGE_FOR_CHAT_FAILURE,
  REFERSH_TOKEN,
  REFERSH_TOKEN_FAILURE,
  GENERATE_PROPOSAL,
  GENERATE_PROPOSAL_FAILURE,
  ALL_GRANTS,
  ALL_GRANTS_ERROR,
  SEARCH_GRANTS,
  SEARCH_GRANTS_ERROR
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


    export const verifyOtp =
  ({ data }) =>
    async (dispatch) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, data);
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

        console.log("state?????",state)
        const authToken = state?.data?.loginData?.access_token
        console.log("authToken?", authToken)
        const response = await axios.get(`${API_BASE_URL}/auth/me`,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
              'content-type': 'multipart/form-data'
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


export const getAllSampleProposals =
  () =>
    async (dispatch, getState) => {
      try {

        const state = getState();
        const authToken = state?.data?.loginData?.access_token
        console.log("authToken?", authToken)
        const response = await axios.get(`${API_BASE_URL}/users/all_sample_proposals`,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
              'content-type': 'multipart/form-data'
            },
          }
        );
        dispatch({ type: ALL_SAMPLE_PROPOSALS, payload: response.data });
        return response;

      } catch (error) {
        dispatch({ type: ALL_SAMPLE_PROPOSALS_FAILURE, payload: error.response });
        dispatch({ type: ALL_SAMPLE_PROPOSALS, payload: [] });
        return error;
      }
    };



export const getProposalQuestions =
  (data) =>
    async (dispatch, getState) => {
      try {

        const state = getState();
        const authToken = state?.data?.loginData?.access_token
        console.log("authToken?", authToken)
        console.log("data??", data)
        const response = await axios.post(`${API_BASE_URL}/users/proposal_questions`, data,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("sample_proposal_response", response)
        dispatch({ type: PROPOSAL_QUESTION, payload: response.data });
        return response;

      } catch (error) {
        dispatch({ type: PROPOSAL_QUESTION_FAILURE, payload: error.response });
        return error;
      }
    };


export const getAllChats =
  () =>
    async (dispatch, getState) => {
      try {

        const state = getState();
        const authToken = state?.data?.loginData?.access_token
        console.log("authToken?", authToken)
        const response = await axios.get(`${API_BASE_URL}/users/all_chats`,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
              'content-type': 'multipart/form-data'
            },
          }
        );
        dispatch({ type: ALL_CHATS, payload: response.data });
        return response;

      } catch (error) {
        dispatch({ type: ALL_CHATS_FAILURE, payload: error.response });
        dispatch({ type: ALL_CHATS, payload: [] });
        return error;
      }
    };


export const getAllMessagesForChat =
  (chatId) =>
    async (dispatch, getState) => {
      try {

        console.log("chatId??...", chatId)
        const state = getState();
        const authToken = state?.data?.loginData?.access_token
        console.log("authToken?", authToken)
        const response = await axios.get(`${API_BASE_URL}/users/all_messages_for_chat/${chatId}`,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
              'content-type': 'multipart/form-data'
            },
          }
        );

        dispatch({ type: ALL_MESSAGE_FOR_CHAT, payload: response.data });
        return response;

      } catch (error) {
        dispatch({ type: ALL_MESSAGE_FOR_CHAT_FAILURE, payload: error.response });
        dispatch({ type: ALL_MESSAGE_FOR_CHAT, payload: [] });
        return error;
      }
    };


export const refershTokenValue =
  () =>
    async (dispatch, getState) => {
      try {

        const state = getState();
        const authToken = state?.data?.loginData?.access_token
        const data = {
          "refresh_token": authToken
        }
        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh`, data,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("sample_proposal_response", response)
        dispatch({ type: REFERSH_TOKEN, payload: response.data });
        return response;

      } catch (error) {
        dispatch({ type: REFERSH_TOKEN_FAILURE, payload: error.response });
        return error;
      }
    };


export const genreatePorposalMessage =
  (data) =>
    async (dispatch, getState) => {
      try {

        const state = getState();
        const authToken = state?.data?.loginData?.access_token

        const response = await axios.post(`${API_BASE_URL}/users/generate_proposal`, data,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("generate_proposal_response", response)
        dispatch({ type: GENERATE_PROPOSAL, payload: response.data });
        return response;

      } catch (error) {
        dispatch({ type: GENERATE_PROPOSAL_FAILURE, payload: error.response });
        return error;
      }
    };

export const getAllGrants =
  () =>
    async (dispatch, getState) => {
      try {

        const state = getState();
        const authToken = state?.data?.loginData?.access_token

        const response = await axios.get(`${API_BASE_URL}/users/grants?skip=0&limit=10`,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
              'content-type': 'multipart/form-data'
            },
          }
        );

        console.log("response??", response)
        dispatch({ type: ALL_GRANTS, payload: response.data });
        return response;

      } catch (error) {
        console.log("error??", error)
        dispatch({ type: ALL_GRANTS_ERROR, payload: error.response });
        dispatch({ type: ALL_GRANTS, payload: [] });
        return error;
      }
    };

export const searchAllGrants =
  (search) =>
    async (dispatch, getState) => {
      try {

        const state = getState();
        const authToken = state?.data?.loginData?.access_token


        const data = {
          query: search
        }
        const response = await axios.post(`${API_BASE_URL}/users/search-grants`, data,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("response??", response)
        dispatch({ type: SEARCH_GRANTS, payload: response.data });
        return response;

      } catch (error) {
        console.log("error??", error)
        dispatch({ type: SEARCH_GRANTS_ERROR, payload: error.response });
        dispatch({ type: SEARCH_GRANTS, payload: [] });
        return error;
      }
    };


    export const premiumSupport =
  (data) =>
    async (dispatch, getState) => {
      try {

        const state = getState();
        const authToken = state?.data?.loginData?.access_token
    
        const response = await axios.post(`${API_BASE_URL}/users/premium-support`, data,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("premium-support", response)

        return response;

      } catch (error) {
        return error;
      }
    };

    



export const logout =
  () =>
    async (dispatch) => {
      try {
        dispatch({ type: LOGOUT_SUCCESS });
        window.location.href = "/";
      } catch (error) {

        return error;
      }
    };



// export const logout = () => ({
//   type: LOGOUT_SUCCESS,
// });

export const resetStore = () => ({
  type: RESET_STORE,
});
