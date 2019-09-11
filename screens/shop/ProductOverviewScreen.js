import React,{ useEffect,useState } from "react";
import { FlatList, StyleSheet, Text, View, Platform,Button,ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cardActions from "../../store/actions/cartAction";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from  '../../constants/Colors'
import { fetchProduct } from "../../store/actions/productsAction";

const ProductOverviewScreen = props => {
  const [isLoading,setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false);
  const products = useSelector(state => state.products.allAvailableProducts);
  const dispatch = useDispatch();
  const viewProductDetailHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };

  const loadProduct = async () => {
    try {
      setIsError(null)
      setIsLoading(true);
      await dispatch(fetchProduct())
      setIsLoading(false);

    } catch(e) {setIsError(true)}
  }

  useEffect(()=>{
    const willFocusRef = props.navigation.addListener('willFocus',loadProduct)
    return () =>{
      willFocusRef.remove();
    }
  })

  useEffect(()=>{
    loadProduct();
  },[])

  if(isError) {
    return <View style={styles.centered} ><Text>Something went wrong</Text><Button title='Try Again' onPress={loadProduct} /></View>  
  }

// if(isLoading) {
//   return <View style={styles.centered}><ActivityIndicator size='large' color={Colors.primaryColor} /></View>
// }

if(!isLoading && products.length === 0) {
  return <View style={styles.centered} ><Text>Product is empty</Text></View>  
}



  return (
    <FlatList
      onRefresh={loadProduct}
      refreshing={isLoading}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            viewProductDetailHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primaryColor}
            title="View Detail"
            onPress={()=> viewProductDetailHandler(itemData.item.id, itemData.item.title)}
          />
          <Button
            color={Colors.primaryColor}
            title="Add To Cart"
            onPress={() => {
              dispatch(cardActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered:{
    alignItems:'center',
    justifyContent:"center",
    flex:1
  }
});

ProductOverviewScreen.navigationOptions = navObj => {
  return {
    title: "All Products",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navObj.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
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
export default ProductOverviewScreen;
