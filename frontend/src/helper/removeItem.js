export const removeItem = (cartItems, id) => {
  const existingItemCart = cartItems.find((cartItem) => cartItem._id === id);
  console.log('existingItemCart', existingItemCart);
  if (existingItemCart) {
    const newCartItems = cartItems.filter((el) => el._id !== id);
    console.log('newCartItems', newCartItems);
    return newCartItems;
  }
  return cartItems;
};
