const {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_DETAILS_FAIL,
  USER_PROFILE_DETAILS_CLEAR,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAIL,
  USERS_LIST_RESET,
  REMOVE_USER_REQUEST,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAIL,
  SHOW_MODAL,
  HIDE_MODAL,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} = require('../../actions/types');

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const registerReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {}, error: '' }, action) => {
  switch (action.type) {
    case USER_PROFILE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: '' };
    case USER_PROFILE_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_PROFILE_DETAILS_CLEAR:
      return { user: {}, error: '' };

    default:
      return state;
  }
};

export const updateUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//! ADMIN SECTION

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return { loading: true };
    case USERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USERS_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_USER_REQUEST:
      return { loading: true };
    case REMOVE_USER_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_USER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return { loading: true };
    case USER_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const updateUser = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, UupdatedUser: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const modalReducer = (state = { show: false }, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { show: true };
    case HIDE_MODAL:
      return { show: false };

    default:
      return state;
  }
};
