/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productListReducers';
import { loginReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer';

const reducers = combineReducers({ porductList: productListReducer, productDetail: productDetailsReducer, cart: cartReducer, userLogin: loginReducer });
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const initialState = { cart: { cartItem: cartItemsFromStorage } };
const middleware = [thunk]
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))



export default store;
