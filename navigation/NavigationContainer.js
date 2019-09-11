import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ShopNavigatior from "./ShopNavigator";

const NavigationContainer = props => {
  const shopRef = useRef();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    console.log("shop ref: ", auth);
    if (!!!auth.token) {
        console.log("shop auth: ", auth);
      shopRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [auth]);
  return <ShopNavigatior ref={shopRef} />;
};

export default NavigationContainer;
