import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [imageLoaded,setImageLoaded]=useState(false);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [document, setDocument] = useState(null); // State for document

  const handleSignUp = () => {
    navigation.navigate("SignIn");
  };

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      setDocument({ uri: result.assets[0].uri, name: result.assets[0].name });
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (

    <ImageBackground
    source={require('../../assets/workerBackgroundImage.jpg')}
    style={styles.backgroundImage}
    onLoad={()=>setImageLoaded(true)}
    >
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
      
      {!imageLoaded ? (
          // Show loading indicator or any content while the image is loading
          <ActivityIndicator size="large" color="#00716F" />
        ) : (
          <>
        <Text style={styles.title}>Create Your Worker Account</Text>

        <TextInput
          style={[styles.input, styles.textStyling]}
          placeholder="First Name"
          value={firstName}
          placeholderTextColor="#FFF"
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          placeholderTextColor="#FFF"
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={userName}
          placeholderTextColor="#FFF"
          onChangeText={(text) => setUserName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          placeholderTextColor="#FFF"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          placeholderTextColor="#FFF"
          
          onChangeText={(text) => setCity(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          placeholderTextColor="#FFF"
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          placeholderTextColor="#FFF"
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          placeholderTextColor="#FFF"
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <View style={styles.documentContainer}>
          <TouchableOpacity
            style={styles.documentButton}
            onPress={handleDocumentUpload}
          >
            <Text style={styles.documentButtonText}>Choose Document</Text>
          </TouchableOpacity>
          {document && <Text style={styles.documentName}>{document.name}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        </>
        )}
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  backgroundImage:{
    flex:1,
    
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    padding: 16,
    
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff", // White text
    textShadowColor: "#000", // Black text shadow
    textShadowOffset: { width: 2, height: 2 }, // Adjust the shadow offset as needed
    textShadowRadius: 5, // Adjust the shadow radius as needed
    
  },
  textStyling:{
    fontWeight:"bold"
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 30,
    paddingVertical: 15,
    width:"80%",
    borderWidth:3,
    backgroundColor: "rgba(169, 169, 169, 0.3)", // Greyish color with transparency,
    fontWeight:"bold"
  },
  button: {
    backgroundColor: "#00716F", // Green button
    borderRadius: 10, // Adjust the border radius for rounded edges
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  
  buttonText: {
    color: "#FFF", // Green text
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor:"#00716F",
    width:"40%"
  },
  documentContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  documentButton: {
    backgroundColor: "#00716F", // White button
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  documentButtonText: {
    color: "#FFF", // Green text
    fontSize: 14,
    fontWeight:"bold"
  },
  documentName: {
    marginTop: 10,
    fontSize: 14,
    color: "#00716F",
  },
});

export default SignUp;
