export const addCartItem = (cartItems, cartItemToAdd) => {
  const existingItemCart = cartItems.find((cartItem) => cartItem._id === cartItemToAdd._id);

  if (existingItemCart) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  return [...cartItems, { cartItemToAdd, quantity: 1, itemAdded: true }];
};
