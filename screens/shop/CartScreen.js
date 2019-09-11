import React,{ useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector,useDispatch } from "react-redux";


import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cartAction";
import * as ordersAction from '../../store/actions/ordersAction'
import Card from '../../components/UI/Card';
import Loader from  '../../components/UI/Loader'

const CartScreen = props => {
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const [isLoaded,setIsLoaded] = useState(false);
  //   const totalAmount = 123;
  const cartItem = useSelector(state => {
    const Items = state.cart.items;
    return Object.keys(Items).map(productId => {
      return {
        productId: productId,
        productTitle: Items[productId].productTitle,
        productPrice: Items[productId].productPrice,
        sum: Items[productId].sum,
        quantity: Items[productId].quantity
      };
    });
  });
  const dispatch = useDispatch()
  console.log(cartItem);
  const createOrder = async () =>{
    setIsLoaded(true)
    await dispatch(ordersAction.createOrder(cartItem,totalAmount))
    setIsLoaded(false)
  }
  return (
    <View style={styles.screen}>
      <Card style={styles.totalContainer}>
        <Text style={styles.text}>
          Total
          <Text style={styles.amount}> ${totalAmount.toFixed(2)}</Text>
        </Text>
        {!isLoaded?<Button
          title="Order"
          disabled={cartItem.length === 0}
          color={Colors.accentColor}
          onPress= {() => createOrder()}
        />:<Loader/>}
        
      </Card>
      <FlatList
        data={cartItem}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            sum={itemData.item.sum}
            onDelete={()=>{
                dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}
            deletable
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    
  },
  text: {
    fontSize: 18,
    fontFamily: "open-sans-bold"
  },
  amount: {
    color: Colors.primaryColor
  }
});

CartScreen.navigationOptions = {
  headerTitle:'Cart'
}

export default CartScreen;
