import axios from "axios";

import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_PROFILE_DETAILS_REQUEST,
	USER_PROFILE_DETAILS_SUCCESS,
	USER_PROFILE_DETAILS_FAIL,
	USER_PROFILE_DETAILS_CLEAR,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USERS_LIST_REQUEST,
	USERS_LIST_SUCCESS,
	USERS_LIST_FAIL,
	USERS_LIST_RESET,
	ORDERS_DETAILS_RESET,
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
	HIDE_MODAL_PRODUCTS,
	SHOW_MODAL_PRODUCTS,
} from "./types";

//* ------------------------  LOG USER -----------------

export const logUser = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(
			"https://lux-house.onrender.com/api/v1/users/login",
			{ email, password },
			config
		);
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

//! ------------------------  LOGOUT -----------------

export const logOut = () => (dispatch) => {
	dispatch({
		type: USER_LOGOUT,
	});
	dispatch({
		type: USER_PROFILE_DETAILS_CLEAR,
	});
	dispatch({
		type: USERS_LIST_RESET,
	});
	dispatch({ type: ORDERS_DETAILS_RESET });
	localStorage.removeItem("userInfo");
};

//* ------------------------  REGISTER -----------------

export const registringUser = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(
			"https://lux-house.onrender.com/api/v1/users/register",
			{ name, email, password },
			config
		);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

// ? ------------------------  GET USER DETAILS-----------------

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		const { userInfo } = getState().userLogin;
		dispatch({
			type: USER_PROFILE_DETAILS_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`https://lux-house.onrender.com/api/v1/users/${id}`, config);

		dispatch({
			type: USER_PROFILE_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_PROFILE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

// ? ------------------------ UPDATE USER PROFILE-----------------

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		const { userInfo } = getState().userLogin;
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(
			`https://lux-house.onrender.com/api/v1/users/profile`,
			user,
			config
		);

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

// ? ------------------------  GET USERS LIST ADMIN ONLY -----------------

export const getUsersList = () => async (dispatch, getState) => {
	try {
		const { userInfo } = getState().userLogin;
		dispatch({
			type: USERS_LIST_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`https://lux-house.onrender.com/api/v1/users`, config);

		dispatch({
			type: USERS_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USERS_LIST_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

// ? ------------------------  REMOVE USER ADMIN ONLY-----------------

export const removeUser = (id) => async (dispatch, getState) => {
	try {
		const { userInfo } = getState().userLogin;
		dispatch({
			type: REMOVE_USER_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.delete(`https://lux-house.onrender.com/api/v1/users/${id}`, config);

		dispatch({
			type: REMOVE_USER_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: REMOVE_USER_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

// ?================== GET USER ById ADMIN ONLY ================

export const getUser = (id) => async (dispatch, getState) => {
	try {
		const { userInfo } = getState().userLogin;
		dispatch({
			type: USER_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`https://lux-house.onrender.com/api/v1/users/${id}`, config);

		dispatch({
			type: USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

// ? ------------------------ UPDATE USER ADMIN ONLY-----------------

export const updateUserAC = (id, user) => async (dispatch, getState) => {
	try {
		const { userInfo } = getState().userLogin;
		dispatch({
			type: USER_UPDATE_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(
			`https://lux-house.onrender.com/api/v1/users/${id}`,
			user,
			config
		);

		dispatch({
			type: USER_UPDATE_SUCCESS,
		});
		dispatch({ type: USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

//! MODAL===============
export const showModal = () => (dispatch) => {
	dispatch({
		type: SHOW_MODAL,
	});
};
export const hideModal = () => (dispatch) => {
	dispatch({
		type: HIDE_MODAL,
	});
};
export const showModalProduct = () => (dispatch) => {
	dispatch({
		type: SHOW_MODAL_PRODUCTS,
	});
};
export const hideModalProduct = () => (dispatch) => {
	dispatch({
		type: HIDE_MODAL_PRODUCTS,
	});
};
