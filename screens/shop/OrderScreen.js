import React from "react";
import { FlatList, Text, Platform } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = props => {
   
  const orders = useSelector(state => state.order.orders);
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
