import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, Platform, Button, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";

import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/productsAction";

const SelfProductScreen = props => {
  const selfProducts = useSelector(state => state.products.selfProducts);
  const dispatch = useDispatch();
  const editScreenHandler = productId => {
    props.navigation.navigate("EditProduct", { productId: productId });
  };

  const deleteHandler = id => {
    Alert.alert("Are you sure", "You really want to delete this.", [
      {
        text: "No",
        style: "default"
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        }
      }
    ]);
  };

  return (
    <FlatList
      data={selfProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editScreenHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primaryColor}
            title="Edit"
            onPress={() => {
              editScreenHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primaryColor}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

SelfProductScreen.navigationOptions = navObj => {
  return {
    title: "Your Products",
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          title="menu"
          onPress={() => {
            navObj.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default SelfProductScreen;
