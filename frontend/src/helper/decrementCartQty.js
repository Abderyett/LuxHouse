export const decrementQty = (cartItems, cartItemAdded) =>
  cartItems.map((cartItem) =>
    cartItem._id === cartItemAdded._id
      ? { ...cartItem, quantity: cartItem.quantity === 0 ? 0 : cartItem.quantity - 1 }
      : cartItem
  );
