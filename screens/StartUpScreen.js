import React,{ useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { AsyncStorage } from "react-native";

import Loader from "../components/UI/Loader";
import { authenticate } from "../store/actions/authAction";

const StartUpScreen = props => {
    const dispatch = useDispatch();
  useEffect(() => {
      const checkAuth =  async () => {
        const authStr = await AsyncStorage.getItem('userData');
        if(!authStr) {
            return props.navigation.navigate('Auth');
        }
        const auth = JSON.parse(authStr);
        if(!auth.token || !auth.userId || !auth.expirationTime ) {
            return props.navigation.navigate('Auth');
        }

        if(auth.expirationTime <= new Date().getMilliseconds() ) {
            return props.navigation.navigate('Auth');
        }
        const expirationTimer = auth.expirationTime -  Date().getMilliseconds();
        dispatch(authenticate(auth.token,auth.userId,expirationTimer))
        props.navigation.navigate('Auth');



        console.log(auth);
        console.log(typeof auth);
        props.navigation.navigate('Shop');
        // if(!auth.token || !!auth.token)
      }
      checkAuth();
  }, []);

  return <Loader />;
};

export default StartUpScreen;
