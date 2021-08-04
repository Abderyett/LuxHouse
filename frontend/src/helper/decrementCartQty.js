export const decrementQty = (cartItems, cartItemAdded) => {
  const existingItemCart = cartItems.find((cartItem) => cartItem._id === cartItemAdded._id);

  if (existingItemCart) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemAdded._id
        ? { ...cartItem, quantity: cartItem.quantity === 0 ? 0 : cartItem.quantity - 1 }
        : cartItem
    );
  }
};
