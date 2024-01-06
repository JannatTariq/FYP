import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BackButton from "../Components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../context/authContext";

const ClientScreen = () => {
  const navigation = useNavigation();
  const { state, signUp, clearErrorMessage } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSignUp = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View>
      <BackButton />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/client_house.jpg")}
            style={styles.image}
          />
          <Text style={styles.title}>Welcome Client!</Text>

          <Text style={styles.subtitle}>
            Building a house has never been easier! We hope you get your dream
            home.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCorrect={false}
              autoCapitalize="none"
              placeholderTextColor="#00716F"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#00716F"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#00716F"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor="#00716F"
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Address"
              placeholderTextColor="#00716F"
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          {/* <View style={styles.inputContainer}>
          <TextInput
            placeholder="Location"
            placeholderTextColor="#00716F"
            style={styles.input}
            onChangeText={(text) => setLocation(text)}
          />
        </View> */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              signUp({ username, email, password, confirmPassword, address });
            }}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  image: {
    width: "100%",
    height: "33%",
    aspectRatio: 3 / 2,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
  },
  subtitle: {
    marginHorizontal: 55,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 30,
    paddingVertical: 15,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00716F",
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
  },
});

export default ClientScreen;
