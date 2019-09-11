import React from "react";
import { View, ActivityIndicator, StyleSheet,Text } from "react-native";
import Colors from "../../constants/Colors";

const Error = props => {
  return (
    <View style={styles.centered}>
      <Text>{props.errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Error;
