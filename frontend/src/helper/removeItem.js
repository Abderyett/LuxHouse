export const removeItem = (cartItems, id) => {
  const existingItemCart = cartItems.find((cartItem) => cartItem._id === id);

  if (existingItemCart) {
    const newCartItems = cartItems.filter((el) => el._id !== id);

    return newCartItems;
  }
  return cartItems;
};
