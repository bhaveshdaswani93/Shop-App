import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";


import Colors from "../../constants/Colors";
import Card from '../../components/UI/Card'

const ProductItem = props => {
  
 
  const TouchableCmp =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Card style={styles.product}>
      <TouchableCmp useForeground  onPress={props.onSelect}>
        <View >
          <Image style={styles.image} source={{ uri: props.image }} />
          <View style={styles.content}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>{props.price.toFixed(2)}</Text>
          </View>

          <View style={styles.action}>
            {props.children}
          </View>
        </View>
      </TouchableCmp>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    
    margin: 20,
    overflow:"hidden"
  },
  image: {
    height: "60%",
    width: "100%"
  },
  title: {
    fontSize: 18,
    fontFamily:'open-sans-bold'
  },
  price: {
    fontSize: 14,
    fontFamily:'open-sans'
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 15
  },
  content: {
    alignItems: "center",
    height: "15%",
    marginVertical: 3
  }
});

export default ProductItem;
