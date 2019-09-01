import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartAction";
import CartItem from "../../models/cart-item";
import { CREATE_ORDER } from "../actions/ordersAction";
import { DELETE_PRODUCT } from "../actions/productsAction";

const initialState = {
  totalAmount: 0,
  items: {}
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      let addedOrUpdatedProduct;
      if (state.items[addedProduct.id]) {
        const updatedQuantity = state.items[addedProduct.id].quantity + 1;
        const updatedPrice =
          state.items[addedProduct.id].sum + addedProduct.price;
        updateTotal = addedOrUpdatedProduct = new CartItem(
          updatedQuantity,
          addedProduct.title,
          addedProduct.price,
          updatedPrice
        );
      } else {
        addedOrUpdatedProduct = new CartItem(
          1,
          addedProduct.title,
          addedProduct.price,
          addedProduct.price
        );
      }
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: addedOrUpdatedProduct
        },
        totalAmount: state.totalAmount + addedProduct.price
      };
    case REMOVE_FROM_CART:
      const quantity = state.items[action.productId].quantity;
      const removedItem = state.items[action.productId];
      let updatedStateItem;
      console.log(removedItem)
      if (quantity > 1) {
          const updateDelItem = new CartItem(removedItem.quantity-1,removedItem.productTitle,removedItem.productPrice,removedItem.sum-removedItem.productPrice)
        updatedStateItem = { ...state.items,[action.productId]:updateDelItem };  
      } else {
        updatedStateItem = { ...state.items };
        delete updatedStateItem[action.productId];

      }
      return {
          ...state,
          items:updatedStateItem,
          totalAmount: state.totalAmount - removedItem.productPrice
      }
      case CREATE_ORDER:
        return initialState;
        case DELETE_PRODUCT:
          if(!state.items[action.productId]) {
            return state
          }
          const updatedItems = {...state.items}
          const sum = updatedItems[action.productId].sum;
          delete updatedItems[action.productId]  
          return {
            ...state,
            items:updatedItems,
            totalAmount:totalAmount-sum
          }

    default:
      return state;
  }
};

export default cartReducer;
