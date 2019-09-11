import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import { updateProduct, addProduct } from "../../store/actions/productsAction";
import Input from "../../components/UI/Input";
import Loader from "../../components/UI/Loader";

const FORM_UPDATE_INPUT = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE_INPUT) {
    const updatedFormValues = { ...state.inputValues };
    updatedFormValues[action.input] = action.value;
    updateInputValidity = { ...state.inputValidity };
    updateInputValidity[action.input] = action.isValid;
    let formValidity = true;
    for (const key in updateInputValidity) {
      formValidity = formValidity && updateInputValidity[key];
    }
    return {
      ...state,
      inputValues: updatedFormValues,
      inputValidity: updateInputValidity,
      formValid: formValidity
    };
  }
  return state;
};

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const productId = props.navigation.getParam("productId");
  let product;
  try {
    product = useSelector(state =>
      state.products.selfProducts.find(product => product.id === productId)
    );
  } catch (e) {
    console.log(e);
  }

  const dispatch = useDispatch();
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      price: "",
      desctription: product ? product.description : ""
    },
    inputValidity: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      price: product ? true : false,
      desctription: product ? true : false
    },
    formValid: product ? true : false
  });

  const addUpdateProductHandler = useCallback(async () => {
    try {
      if (!formState.formValid) {
        Alert.alert("Form Invalid", "Please Correct The Inputs", [
          { text: "Okay" }
        ]);
        return;
      }
      // console.log("Product handler");
      setIsLoading(true);
      product
        ? await dispatch(
            updateProduct(
              productId,
              formState.inputValues.title,
              formState.inputValues.desctription,
              formState.inputValues.imageUrl
            )
          )
        : await dispatch(
            addProduct(
              formState.inputValues.title,
              formState.inputValues.desctription,
              formState.inputValues.imageUrl,
              +formState.inputValues.price
            )
          );
      // setIsLoading(false)
      props.navigation.goBack();
    } catch (err) {
      Alert.alert("Error",err.message, [
        { text: "Okay" }
      ]);
    }
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({
      productSideEffect: addUpdateProductHandler
    });
  }, [addUpdateProductHandler]);
  const formChangeHandler = useCallback((inputIdentifier, text, isValid) => {
    // return;
    dispatchForm({
      value: text,
      isValid: isValid,
      input: inputIdentifier,
      type: FORM_UPDATE_INPUT
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorMessage="Please Provide title"
            returnKeyType="next"
            onInputChange={formChangeHandler}
            initialValue={product ? product.title : ""}
            initialValidity={product ? true : false}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorMessage="Please Provide Image Url"
            returnKeyType="next"
            onInputChange={formChangeHandler}
            initialValue={product ? product.imageUrl : ""}
            initialValidity={product ? true : false}
            required
          />
          {product ? null : (
            <Input
              id="price"
              label="Price"
              errorMessage="Please Provide Price"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={formChangeHandler}
              initialValidity={product ? true : false}
              required
              min={0.1}
            />
          )}
          <Input
            id="desctription"
            label="Description"
            errorMessage="Please Provide Description"
            multiline
            numberOfLines={3}
            returnKeyType="done"
            onInputChange={formChangeHandler}
            initialValue={product ? product.description : ""}
            initialValidity={product ? true : false}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  }
});

export default EditProductScreen;
