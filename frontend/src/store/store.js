/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productListReducers';
import { cartReducer } from './reducers/cartReducer';

const reducers = combineReducers({ porductList: productListReducer, productDetail: productDetailsReducer, count: cartReducer });
const initialState = {};
const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
