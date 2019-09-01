import { CREATE_ORDER } from "../actions/ordersAction";
import Order from "../../models/order";

const initialState = {
  orders: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderItem.cartItems,
        action.orderItem.totalAmount,
        new Date()
      );
      const updatedOrders = state.orders.concat(newOrder);
      return {
          ...state,
          orders:updatedOrders
      }
    default:
      return state;
  }
};

export default orderReducer;
