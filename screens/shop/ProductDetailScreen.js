import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet
} from "react-native";
import { useSelector,useDispatch } from "react-redux";


import Colors from "../../constants/Colors";
import * as cardActions from '../../store/actions/cartAction'


const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.allAvailableProducts.find(
      product => product.id === productId
    )
  );
  const dispatch = useDispatch()
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.buttonContainer} >
        <Button color={Colors.primaryColor}  title="Add To Cart" onPress={() => {
          dispatch(cardActions.addToCart(selectedProduct))
        }} />
      </View>

      <Text style={styles.price}> ${selectedProduct.price} </Text>
      <Text style={styles.description}> {selectedProduct.description} </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%"
  },
  button: {
    
  },
  buttonContainer:{
    marginVertical: 10,
    alignItems:"center"
  },
  price: {
    fontSize: 20,
    marginVertical: 10,
    textAlign:"center",
    fontFamily:'open-sans-bold'
  },
  description: {
    fontSize: 16,
    textAlign:"center",
    marginHorizontal:20,
    fontFamily:'open-sans'
  }
});

ProductDetailScreen.navigationOptions = navObj => {
  const productTitle = navObj.navigation.getParam("productTitle");
  return {
    headerTitle: productTitle
  };
};

export default ProductDetailScreen;
