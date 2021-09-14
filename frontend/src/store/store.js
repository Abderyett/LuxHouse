/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productListReducers';
import { loginReducer, registerReducer, userDetailsReducer, updateUserProfileReducer, userListReducer, deleteUserReducer, modalReducer, updateUserReducer, userReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer';
import { addedOrderReducer, orderDetailsReducer, ordersDetailsReducer } from './reducers/orderReducer';
import { paymentReducer, updatePaypalPaymentReducer, updateStripePaymentReducer } from './reducers/paymentReducer';


// ? Combine Reducer ======================================================

const reducers = combineReducers(
  {
    porductList: productListReducer,
    productDetail: productDetailsReducer,
    registerUser: registerReducer,
    userLogin: loginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: updateUserProfileReducer,
    usersList: userListReducer,
    deleteUser: deleteUserReducer,
    updateUser: updateUserReducer,
    userInfo: userReducer,
    toggleModal: modalReducer,
    cart: cartReducer,
    addedOrder: addedOrderReducer,
    orderDetails: orderDetailsReducer,
    ordersDetails: ordersDetailsReducer,
    payment: paymentReducer,
    updateStripePayment: updateStripePaymentReducer,
    updatePaypalPayment: updatePaypalPaymentReducer,
  });


// ? Local Storage ======================================================


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


// ? INITIAL STATE ======================================================

const initialState = { cart: { cartItem: cartItemsFromStorage }, userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))



export default store;


