export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, productId: productId };
};

export const updateProduct = (productId, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    product: {
      title,
      description,
      imageUrl
    },
    pid: productId
  };
};

export const addProduct = (title, description, imageUrl, price) => {
  return {
    type: ADD_PRODUCT,
    product: { title, description, imageUrl, price }
  };
};
