import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import CartItem from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";

const OrderItem = props => {
  const [toShowOrderDetails, setToShowOrderDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.content}>
        <Text style={styles.amount}>${props.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primaryColor}
        onPress={() => {
          setToShowOrderDetails(toShowOrderDetails => !toShowOrderDetails);
        }}
        title="Show Detail"
      />
      {toShowOrderDetails && (
        <View style={styles.orderDetail}>
          {props.items.map(item => (
            <CartItem
                key={item.productId}
              quantity={item.quantity}
              title={item.productTitle}
              sum={item.sum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    elevation: 3,
    backgroundColor: "white",
    alignItems: "center"
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15
  },
  amount: {
    color: Colors.primaryColor,
    fontSize: 16,
    fontFamily: "open-sans-bold"
  },
  date: {
    color: "#888",
    fontSize: 16
  },
  button: {
    color: Colors.primaryColor
  },
  orderDetail:{
      width:'100%'
  }
});

export default OrderItem;
