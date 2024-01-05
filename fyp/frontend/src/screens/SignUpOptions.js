import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignupOptionsScreen = () => {

  const navigation = useNavigation();

  const navigateToSignup = (role) => {
    navigation.navigate(`${role}`);
  };

  const renderButton = (role, imageSource, title) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigateToSignup(role)}
    >
      <View>
        <Image source={imageSource} style={styles.buttonImage} />
      </View>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your role to sign up</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          {renderButton(
            "SignUp",
            require("../../assets/Architect.png"),
            "Architect"
          )}
          <View style={styles.widthID}>
            {renderButton(
              "SignUp",
              require("../../assets/InteriorDesigner.png"),
              "Interior Designer"
            )}
          </View>
        </View>
        <View style={styles.horizontalLineID}></View>
        <View style={styles.buttonRow1}>
          {renderButton("Client", require("../../assets/Client.png"), "Client")}
          <View style={styles.widthC}>
            {renderButton(
              "SignUp",
              require("../../assets/Contractor.png"),
              "Contractor"
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#004d40", // Dark Green background
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight:"bold",
    textAlign: "center",
    color: "#FFF", // White text color
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "90%",
    alignItems: "center",
    backgroundColor: "#CFD8DC", // White background for buttons
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonRow1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 8,
    overflow: "hidden",
    margin: 8,
    padding: 10,
  },
  imageContainer: {
    borderBottomWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
  },
  buttonImage: {
    width: 100,
    height: 110,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle:"italic"
  },
  horizontalLineA: {
    borderBottomWidth: 1,
    marginTop: 15,
  },
  horizontalLineID: {
    borderBottomWidth: 1,
    width: 300,
    marginBottom: 25,
  },
  widthID: {
    marginLeft: 25,
    borderLeftWidth: 1,
    marginTop: 35,
    marginBottom: 30,
    marginLeft: 8,
  },
  widthC: {
    marginLeft: 5,
    borderLeftWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default SignupOptionsScreen;
