import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";

const payment = () => {
  const [name, setName] = useState<string>("");
  const stripe = useStripe();
  console.log(name);

  const handlePayment = async () => {
    try {
      const response = await fetch("http://192.168.100.127:8080/pay", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Arshman",
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment completed, thankyou!");
    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong, try again later");
    }
  };
  return (
    <View>
      <View>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter name of doctor"
        />
        <Button title="Submit" onPress={handlePayment}></Button>
      </View>
    </View>
  );
};

export default payment;

const styles = StyleSheet.create({});
