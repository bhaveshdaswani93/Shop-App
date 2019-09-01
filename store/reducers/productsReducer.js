import { PRODUCTS } from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT
} from "../actions/productsAction";
import Product from "../../models/product";
const initialState = {
  allAvailableProducts: PRODUCTS,
  selfProducts: PRODUCTS.filter(product => product.ownerId === "u1")
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        selfProducts: state.selfProducts.filter(
          product => product.id !== action.productId
        ),
        allAvailableProducts: state.allAvailableProducts.filter(
          product => product.id !== action.productId
        )
      };
    case ADD_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        action.product.price
      );
      return {
        ...state,
        allAvailableProducts: state.allAvailableProducts.concat(newProduct),
        selfProducts: state.selfProducts.concat(newProduct)
      };
    case UPDATE_PRODUCT:
      const prodId = action.pid;
      const selfProductIndex = state.selfProducts.findIndex(
        product => product.id === prodId
      );
      const updatedProduct = new Product(
        prodId,
        state.selfProducts[selfProductIndex],
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        state.selfProducts[selfProductIndex].price
      );
      const updateSelfProducts = [ ...state.selfProducts ];
      updateSelfProducts[selfProductIndex] = updatedProduct;
      const updatedAllAvailableProducts = [ ...state.allAvailableProducts ];
      const allAvailableProductsIndex = state.allAvailableProducts.findIndex(
        product => product.id === prodId
      );
      updatedAllAvailableProducts[allAvailableProductsIndex] = updatedProduct;
      return {
          ...state,
          allAvailableProducts:updatedAllAvailableProducts,
          selfProducts:updateSelfProducts
      }
    default:
      return state;
  }
};

export default productReducer;
