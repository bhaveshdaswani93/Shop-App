export const CREATE_ORDER = "CREATE_ORDER";

export const createOrder = (cartItems, totalAmount) => {
  return {
    type: CREATE_ORDER,
    orderItem: { cartItems: cartItems, totalAmount: totalAmount }
  };
};
