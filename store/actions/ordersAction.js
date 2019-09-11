import Order from "../../models/order";

export const CREATE_ORDER = "CREATE_ORDER";
export const FETCH_ORDER = "FETCH_ORDER";

export const fetchOrder = () => {
  return async (dispatch,getState) => {
    const userId = getState().auth.userId
    const response = await fetch(`https://react-native-shop-app-d3324.firebaseio.com/orders/${userId}.json`);
    if(!response.ok) {
      throw new Error('Firebase error')
    }
    const resData = await response.json()
    const orders = []
    
    for(key in resData) {
      let order = resData[key];
      orders.push(new Order(key,order.cartItems,order.totalAmount,new Date(order.date)))
    }
    console.log('fetch orders action: ',orders);
    dispatch({type:FETCH_ORDER,orders:order})
  }
}

export const createOrder = (cartItems, totalAmount) => {
  return async (dispatch,getState) => {
    const userId = getState().auth.userId
    const date = new Date();
    const response = await fetch(
      `https://react-native-shop-app-d3324.firebaseio.com/orders/${userId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await response.json();
    dispatch({
      type: CREATE_ORDER,
      orderItem: {
        cartItems: cartItems,
        totalAmount: totalAmount,
        id: resData.name,
        date: date
      }
    });
  };
};
