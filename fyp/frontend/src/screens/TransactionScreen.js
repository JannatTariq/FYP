import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, Image, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";

const TransactionScreen = () => {
  const[imageLoaded,setImageLoaded]=useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [recipient, setRecipient] = useState("");
  const navigation = useNavigation();

  const handlePress = () => {
    console.log("Card Number:", cardNumber);
    console.log("Expiration Date:", expirationDate);
    console.log("CVC:", cvc);
    console.log("Recipient:", recipient);
    navigation.navigate("SignIn");
  };

  return (

    <ImageBackground 
    source={require('../../assets/creditCard.jpg')}
    style={styles.imageStyle}
    onLoad={()=>setImageLoaded(true)}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
      <View style={styles.container}>

      {!imageLoaded ? (
          // Show loading indicator or any content while the image is loading
          <ActivityIndicator size="large" color="#00716F" />
        ) : (
          <>
        <Text style={styles.heading}>Transaction System</Text>

        <TextInput
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text)}
          keyboardType="numeric"
          placeholderTextColor="#FFF"
          style={styles.input}
        />

        <TextInput
          placeholder="Expiration Date"
          value={expirationDate}
          onChangeText={(text) => setExpirationDate(text)}
          placeholderTextColor="#FFF"
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          placeholder="CVC"
          value={cvc}
          onChangeText={(text) => setCvc(text)}
          keyboardType="numeric"
          placeholderTextColor="#FFF"
          style={styles.input}
        />

        <TextInput
          placeholder="Recipient"
          value={recipient}
          onChangeText={(text) => setRecipient(text)}
          placeholderTextColor="#FFF"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </>
        )}
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    marginTop: 40,
    //backgroundColor: "#F2F2F2", // Background color for the container
  },
  imageStyle:{
    flex:1
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: "#00716F", // Border color for the input
    borderWidth: 2,
    padding: 15,
    backgroundColor: "rgba(169, 169, 169, 0.3)", // Background color for the input
    borderRadius: 20, // Border radius for the input
    fontWeight:"bold",
    color:"#FFF",
    
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff", // White text
    textShadowColor: "#000", // Black text shadow
    textShadowOffset: { width: 2, height: 2 }, // Adjust the shadow offset as needed
    textShadowRadius: 5, // Adjust the shadow radius as needed
   
  },
  button:{
    backgroundColor: "#00716F", // Green button
    borderRadius: 10, // Adjust the border radius for rounded edges
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText:{
    color: "#FFF", // Green text
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor:"#00716F",
    width:"40%",
    flex:1,
    textAlign: "center", // Center text horizontally
    textAlignVertical: "center", // Center text vertically,
   
  },
  
});

export default TransactionScreen;
