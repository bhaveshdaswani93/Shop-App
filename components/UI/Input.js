import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const INPUT_UPDATE = "INPUT_UPDATE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_UPDATE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
    
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initialValidity,
    touched: false
  });

  const inputChangeHandler = text => {
    let isValid = true;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_UPDATE, value: text, isValid: isValid });
  };

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [onInputChange, id,inputState]);

  const blurHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={inputChangeHandler}
        onBlur={blurHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer} ><Text style={styles.errorText}>{props.errorMessage}</Text></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    marginVertical: 10
  },
  errorContainer:{
    marginVertical:5
  },
  errorText:{
    color:'red'
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

export default Input;
