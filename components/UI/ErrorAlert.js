import React from "react";
import { View, ActivityIndicator, StyleSheet,Alert } from "react-native";
import Colors from "../../constants/Colors";

const Loader = props => {
  return Alert.alert('Error Occured',props.message,[{text:'Okay'}])
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Loader;
