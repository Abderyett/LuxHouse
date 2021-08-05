export const decrementQty = (cartItems, cartItemToRemove) => {
  const existingItemCart = cartItems.find((cartItem) => cartItem._id === cartItemToRemove._id);
  if (existingItemCart && existingItemCart.quantity === 1) {
    return cartItems.filter((el) => el._id !== cartItemToRemove._id);
  }
  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
};

// cartItem._id === cartItemAdded._id
//     ? { ...cartItem, quantity: cartItem.quantity === 0 ? 0 : cartItem.quantity - 1 }
//     : cartItem
