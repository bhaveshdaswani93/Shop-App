import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProduct = () => {
  console.log("fetch product called successfully.");
  return async (dispatch,getState) => {
    try {
      const userId = getState().auth.userId
      console.log("fetch product called successfully.1");
      const response = await fetch(
        "https://react-native-shop-app-d3324.firebaseio.com/products.json"
      );
      console.log("fetch product called successfully.");
      if (!response.ok) {
        throw Error("Response returned not Ok");
      }
      const resData = await response.json();
      console.log(resData);
      const allProducts = [];
      for (const key in resData) {
        product = resData[key];
        allProducts.push(
          new Product(
            key,
            product.ownerId,
            product.title,
            product.imageUrl,
            product.description,
            product.price
          )
        );
      }
      dispatch({ type: SET_PRODUCT, products: allProducts,selfProduct:allProducts.filter(product=>product.ownerId === userId) });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch,getState) => {
    const token = getState().auth.token
    await fetch(
      `https://react-native-shop-app-d3324.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );
    dispatch({ type: DELETE_PRODUCT, productId: productId });
  };
};

export const updateProduct = (productId, title, description, imageUrl) => {
  console.log("update start");
  console.log({
    productId,
    title,
    description,
    imageUrl
  });
  return async (dispatch,getState) => {
    const token = getState().auth.token
    try {
      const response = await fetch(
        `https://react-native-shop-app-d3324.firebaseio.com/products/${productId}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl
          })
        }
      );
      console.log(response)
      if(!response.ok) {
        throw Error('Firebase error')
      }
      console.log("firebase completed");
      dispatch({
        type: UPDATE_PRODUCT,
        product: {
          title,
          description,
          imageUrl
        },
        pid: productId
      });
    } catch (e) {
      console.log(e)
      throw e;
    }
    console.log("update start init");
  };
};

export const addProduct = (title, description, imageUrl, price) => {

  return async (dispatch,getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    const productRes = await fetch(
      `https://react-native-shop-app-d3324.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId:userId
        })
      }
    );

    const productJs = await productRes.json();
    console.log(product);
    dispatch(saveProduct(title, description, imageUrl, price, productJs.name,userId));
  };

  // return {
  //   type: ADD_PRODUCT,
  //   product: { title, description, imageUrl, price }
  // };
};

const saveProduct = (title, description, imageUrl, price, productId,ownerId) => {
  return {
    type: ADD_PRODUCT,
    product: { title, description, imageUrl, price, productId ,ownerId}
  };
};
