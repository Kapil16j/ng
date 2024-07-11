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

  proposalData: [],
  proposalDataError: null,

  proposalQuestions: [],
  proposalQuestionsError: null,

  allChatsData: [],
  allChatsDataError: null,

  allChatMessages: [],
  allChatMessagesError: null,

  refershTokenData: [],
  refershTokenDataError: null,

  generatePropsalData: [],
  generatePropsalDataError: null,


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

    case ALL_SAMPLE_PROPOSALS:
      return {
        ...state,
        proposalData: action.payload,
        error: null,
        isAuthenticated: false,
      };
    case ALL_SAMPLE_PROPOSALS_FAILURE:
      return {
        ...state,
        proposalDataError: action.payload,
        isAuthenticated: false,
      };

    case PROPOSAL_QUESTION:
      return {
        ...state,
        proposalQuestions: action.payload,
        error: null,
        isAuthenticated: false,
      };
    case PROPOSAL_QUESTION_FAILURE:
      return {
        ...state,
        proposalQuestionsError: action.payload,
        isAuthenticated: false,
      };


    case ALL_CHATS:
      return {
        ...state,
        allChatsData: action.payload,
        error: null,
        isAuthenticated: false,
      };
    case ALL_CHATS_FAILURE:
      return {
        ...state,
        allChatsDataError: action.payload,
        isAuthenticated: false,
      };


    case ALL_MESSAGE_FOR_CHAT:
      return {
        ...state,
        allChatMessages: action.payload,
        error: null,
        isAuthenticated: false,
      };
    case ALL_MESSAGE_FOR_CHAT_FAILURE:
      return {
        ...state,
        allChatMessagesError: action.payload,
        isAuthenticated: false,
      };

    case REFERSH_TOKEN:
      return {
        ...state,
        refershTokenData: action.payload,
        error: null,
        isAuthenticated: false,
      };
    case REFERSH_TOKEN_FAILURE:
      return {
        ...state,
        refershTokenDataError: action.payload,
        isAuthenticated: false,
      };


      case GENERATE_PROPOSAL:
      return {
        ...state,
        generatePropsalData: action.payload,
        error: null,
        isAuthenticated: false,
      };
    case GENERATE_PROPOSAL_FAILURE:
      return {
        ...state,
        generatePropsalDataError: action.payload,
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
