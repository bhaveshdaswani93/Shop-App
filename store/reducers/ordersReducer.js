import { CREATE_ORDER, FETCH_ORDER } from "../actions/ordersAction";
import Order from "../../models/order";


const initialState = {
  orders: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      const newOrder = new Order(
        action.orderItem.id,
        action.orderItem.cartItems,
        action.orderItem.totalAmount,
        action.orderItem.date
      );
      const updatedOrders = state.orders.concat(newOrder);
      return {
          ...state,
          orders:updatedOrders
      }
      case FETCH_ORDER:
        console.log('order reducer',action.orders);
        return {
          ...state,
          orders:action.orders
        }
    default:
        console.log('default order reducer')
      return state;
  }
};

export default orderReducer;
