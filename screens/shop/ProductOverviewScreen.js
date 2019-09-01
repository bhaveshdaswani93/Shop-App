import React from "react";
import { FlatList, StyleSheet, Text, View, Platform,Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cardActions from "../../store/actions/cartAction";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from  '../../constants/Colors'

const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products.allAvailableProducts);
  const dispatch = useDispatch();
  const viewProductDetailHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };
  return (
    <FlatList
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

const styles = StyleSheet.create({});

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
