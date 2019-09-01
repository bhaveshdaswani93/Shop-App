import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import OrderScreen from "../screens/shop/OrderScreen";
import SelfProductScreen from "../screens/user/SelfProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const defaultNav = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
};

const ShopStackNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    defaultNavigationOptions: defaultNav,
    navigationOptions: {
      drawerIcon: drawerConfig => {
        return (
          <Ionicons
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      }
    }
  }
);

const orderStackNav = createStackNavigator(
  {
    Order: OrderScreen
  },
  {
    defaultNavigationOptions: defaultNav,
    navigationOptions: {
      drawerIcon: drawerConfig => {
        return (
          <Ionicons
            name={Platform.OS === "android" ? "md-list" : "ios-list"}
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      }
    }
  }
);

const AdminStackNav = createStackNavigator(
  {
    CreateProduct: SelfProductScreen,
    EditProduct:EditProductScreen
  },
  {
    defaultNavigationOptions: defaultNav,
    navigationOptions: {
      drawerIcon: drawerConfig => {
        return (
          <Ionicons
            name={Platform.OS === "android" ? "md-create" : "ios-create"}
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      }
    }
  }
);

const shopDrawer = createDrawerNavigator(
  {
    Product: ShopStackNavigator,
    Order: orderStackNav,
    Admin:AdminStackNav
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor
    }
  }
);

export default createAppContainer(shopDrawer);
