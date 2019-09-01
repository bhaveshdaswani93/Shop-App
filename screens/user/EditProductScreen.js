import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import { updateProduct, addProduct } from "../../store/actions/productsAction";

const EditProductScreen = props => {
  const productId = props.navigation.getParam("productId");
  let product;
  try {
    product = useSelector(state =>
      state.products.selfProducts.find(product => product.id === productId)
    );
  } catch(e) {
    console.log(e)
  }
  
  const dispatch = useDispatch();
  const [title, setTitle] = useState(product ? product.title : "");
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
  const [price, setPrice] = useState("");
  const [desctription, setDescription] = useState(
    product ? product.description : ""
  );
  const addUpdateProductHandler = useCallback(() => {
    // console.log("Product handler");
    product
      ? dispatch(updateProduct(productId, title, desctription, imageUrl))
      : dispatch(addProduct(title, desctription, imageUrl, +price));
      props.navigation.goBack();
  }, [dispatch,productId,title,desctription,imageUrl,price]);

  useEffect(() => {
    props.navigation.setParams({
      productSideEffect: addUpdateProductHandler
    });
  }, [addUpdateProductHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={value => setTitle(value)}
            keyboardType='default'
            returnKeyType='next'
            autoCapitalize='characters'
            onEndEditing={()=>console.log('end editting')}
            onSubmitEditing={()=>console.log('submited')}
            autoCorrect
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={value => setImageUrl(value)}
          />
        </View>
        {product ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={value => setPrice(value)}
              keyboardType='decimal-pad'
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={desctription}
            onChangeText={value => setDescription(value)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navObj => {
  const productSideEffectFn = navObj.navigation.getParam("productSideEffect");
  return {
    title: navObj.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          title="menu"
          onPress={productSideEffectFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    padding: 15
  },
  formControl: {
    marginVertical: 10
  },
  label: {
    fontSize: 16,
    fontFamily: "open-sans-bold"
  },
  input: {
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 3
  }
});

export default EditProductScreen;
