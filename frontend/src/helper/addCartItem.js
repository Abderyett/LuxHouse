export const addCartItem = (cartItems, cartItemToAdd) => {
  const existingItemCart = cartItems.find((cartItem) => cartItem._id === cartItemToAdd._id);

  if (existingItemCart) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1, product_id: cartItem._id }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1, product_id: cartItemToAdd._id, itemAdded: true }];
};
