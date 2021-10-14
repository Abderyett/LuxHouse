/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer, removeSingleProductReducer, selectedIdReducer, createProductReducer, updateProductReducer, filterProductsReducer } from './reducers/productListReducers';
import { loginReducer, registerReducer, userDetailsReducer, updateUserProfileReducer, userListReducer, deleteUserReducer, modalReducer, updateUserReducer, userReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer';
import { addedOrderReducer, allOrdersReducer, deliveryUpdateReducer, orderDetailsReducer, ordersDetailsReducer } from './reducers/orderReducer';
import { paymentReducer, updatePaypalPaymentReducer, updateStripePaymentReducer } from './reducers/paymentReducer';
import { wichlistReducer } from './reducers/wichlistReducer';


// ? Combine Reducer ======================================================

const reducers = combineReducers(
  {
    porductList: productListReducer,
    filterProduct: filterProductsReducer,
    productDetail: productDetailsReducer,
    removeSingleProduct: removeSingleProductReducer,
    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
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
    allOrders: allOrdersReducer,
    addedOrder: addedOrderReducer,
    orderDetails: orderDetailsReducer,
    ordersDetails: ordersDetailsReducer,
    deliveryUpdate: deliveryUpdateReducer,
    payment: paymentReducer,
    updateStripePayment: updateStripePaymentReducer,
    updatePaypalPayment: updatePaypalPaymentReducer,
    selectedId: selectedIdReducer,
    wichlist: wichlistReducer
  });


// ? Local Storage ======================================================


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const wichlistFromStorage = localStorage.getItem('wichlist') ? JSON.parse(localStorage.getItem('wichlist')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


// ? INITIAL STATE ======================================================

const initialState = { cart: { cartItem: cartItemsFromStorage }, userLogin: { userInfo: userInfoFromStorage }, wichlist: { items: wichlistFromStorage } };

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))



export default store;


