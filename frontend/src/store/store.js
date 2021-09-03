/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productListReducers';
import { loginReducer, registerReducer, userDetailsReducer, updateUserProfileReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer';
import { addedOrderReducer, orderDetailsReducer } from './reducers/orderReducer';
import { paymentReducer, updatePaymentReducer } from './reducers/paymentReducer';


// ? Combine Reducer ======================================================

const reducers = combineReducers(
  {
    porductList: productListReducer,
    productDetail: productDetailsReducer,
    cart: cartReducer,
    userLogin: loginReducer,
    registerUser: registerReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: updateUserProfileReducer,
    addedOrder: addedOrderReducer,
    orderDetails: orderDetailsReducer,
    payment: paymentReducer,
    updatePayment: updatePaymentReducer
  });


// ? Local Storage ======================================================


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


// ? INITIAL STATE ======================================================

const initialState = { cart: { cartItem: cartItemsFromStorage }, userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))



export default store;


