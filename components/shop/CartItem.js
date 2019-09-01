import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.mainText}> {props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.sum.toFixed(2)}</Text>
        { props.deletable && <TouchableOpacity style={styles.deleteButton} onPress={props.onDelete} >
          <Ionicons
            color="red"
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
          />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginVertical: 10,
    backgroundColor:'white'
  },
  itemData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  quantity: {
    fontFamily: "open-sans",
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 10
  }
});

export default CartItem;
