import React, { useEffect, useCallback,useState } from "react";
import { FlatList, Text, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrder } from "../../store/actions/ordersAction";
import Loader from "../../components/UI/Loader";
import Error from "../../components/UI/Error";

const OrderScreen = props => {
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(false);
  const orders = useSelector(state => state.order.orders);
  console.log('orderScreen: ',orders)
  const dispatch = useDispatch();
  const fetchOrderRef = useCallback(async () => {
   try {
     setError(false)
     setIsLoading(true)
    await dispatch(fetchOrder());
  } catch (e) {
    setError(e.message)
  }
  setIsLoading(false)
    
  }, []);
  useEffect(() => {
    
    fetchOrderRef();
  }, []);
  if(isLoading) {
    return <Loader />
  }
  if(error) {
    return <Error  errorMessage = {error} />
  }
  return (
    
    <FlatList
    
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          totalAmount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.cartItems}
        />
      )}
    />
  );
};

OrderScreen.navigationOptions = navObj => {
  return {
    headerTitle: "Orders",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          title="menu"
          onPress={() => {
            navObj.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default OrderScreen;
