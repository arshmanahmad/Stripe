import React from "react";
import { View, Text, StyleSheet, Button, Alert, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import Payment from "./payment";

const index = () => {
  return (
    <View>
      <StripeProvider publishableKey="pk_test_51Pyz3TFFXEMRsbHHdKks2q9NoxKSVkyGVrVQOibxuVYNC2GFZerw2kN3gvDFc6zWW0wk6hYKCh9KwJZMQnSfIjNe00bqxZZ8Br">
        <Payment />
      </StripeProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  productBox: {
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 100,
    fontWeight: "bold",
  },

  priceLabel: {
    fontSize: 40,
  },
});

export default index;
