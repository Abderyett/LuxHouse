export const incrementQty = (cartItems, cartItemAdded) =>
  cartItems.map((cartItem) =>
    cartItem._id === cartItemAdded._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
  );
