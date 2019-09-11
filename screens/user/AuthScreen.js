import React, { useEffect,useReducer, useCallback, useState } from "react";
import {
  View,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authAction from "../../store/actions/authAction";

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

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [isError,setIsError] = useState();
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidity: {
      password: false,
      email: false
    },
    formValid: false
  });

  useEffect(()=>{
    if(isError) {
      Alert.alert('Error Occured',isError,[{text:'Okay'}])
    }
  },[isError])

  const authHandler = async () => {
    if (!formState.formValid) {
      return Alert.alert(
        "Something is not proper",
        "Please Provide Email and password",
        [{ text: "okay" }]
      );
    }
    let action;
    if (isSignUp) {
      action = authAction.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authAction.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    try {
      setIsError(null)
      setIsLoading(true);
      await dispatch(action);
      props.navigation.navigate('Shop')
    } catch(e) {
      setIsError(e.message)
      setIsLoading(false);
    }
  };

  const formChangeHandler = useCallback((inputIdentifier, text, isValid) => {
    // return;
    dispatchForm({
      value: text,
      isValid: isValid,
      input: inputIdentifier,
      type: FORM_UPDATE_INPUT
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      {/* <ScrollView> */}
      <LinearGradient style={styles.gradient} colors={["#ffedff", "#ffe3ff"]}>
        <Card style={styles.inputContainer}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              onInputChange={formChangeHandler}
              initialValue=""
              required
              errorMessage="Email is required"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              id="password"
              label="Password"
              initialValue=""
              onInputChange={formChangeHandler}
              required
              errorMessage="Password is required"
              secureTextEntry
              minLength={5}
              autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
              {isLoading?<ActivityIndicator color={Colors.accentColor} size='large' />:<Button
                color={Colors.primaryColor}
                title={isSignUp ? "Sign up" : "Login"}
                onPress={authHandler}
              />}
            </View>
            <View>
              <Button
                color={Colors.accentColor}
                title={`Switch to ${isSignUp ? "Login" : "Sigh Up"}`}
                onPress={() => setIsSignUp(isSignUp => !isSignUp)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authentication"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%",
    padding: 20
  },
  buttonContainer: {
    marginBottom: 10
  }
});

export default AuthScreen;
