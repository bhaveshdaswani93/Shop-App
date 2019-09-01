import React,{ useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore,combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as Font from 'expo-font'
import { AppLoading } from "expo";
import { composeWithDevTools } from 'redux-devtools-extension';

import ProductsReducer from "./store/reducers/productsReducer";
import CartReducer from "./store/reducers/cartReducer";
import ShopNavigator from './navigation/ShopNavigator';
import OrderReducer  from './store/reducers/ordersReducer';

const rootReducer = combineReducers({
  products:ProductsReducer,
  cart:CartReducer,
  order:OrderReducer
})

const store = createStore(rootReducer,composeWithDevTools());

const loadFonts = () =>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded,setFontloaded] = useState(false);
  if(!fontLoaded) {
    console.log('font loaded',fontLoaded)
    return <AppLoading startAsync={loadFonts} onFinish={()=>setFontloaded(true)} onError={(err)=>console.log(err)} />
  }
  console.log('font loaded',fontLoaded)

  return (
    <Provider store={store} >
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
