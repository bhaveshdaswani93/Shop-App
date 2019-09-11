import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerItems
} from "react-navigation";
import { Platform, SafeAreaView, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import OrderScreen from "../screens/shop/OrderScreen";
import SelfProductScreen from "../screens/user/SelfProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartUpScreen from "../screens/StartUpScreen";
import { logout } from "../store/actions/authAction";

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
    EditProduct: EditProductScreen
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
    Admin: AdminStackNav
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              onPress={ () => {
                dispatch(logout);
                props.navigation.navigate('Auth')
              }}
              color={Colors.primaryColor}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthStackNavigation = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNav
  }
);

const MainNavigation = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthStackNavigation,
  Shop: shopDrawer
});

export default createAppContainer(MainNavigation);
