export const incrementQty = (cartItems, cartItemAdded) => {
  const existingItemCart = cartItems.find((cartItem) => cartItem._id === cartItemAdded._id);

  if (existingItemCart) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemAdded._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
};
