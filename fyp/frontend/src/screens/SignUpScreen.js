import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../Components/BackButton";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../context/authContext";
import * as ImagePicker from "expo-image-picker";

const SignUp = ({ route }) => {
  const { data } = route.params;
  const { state, signUpConstructor, clearErrorMessage } = useContext(Context);
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigation = useNavigation();
  const [role, setRole] = useState("");
  const [firstname, setFirstName] = useState("");

  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uploadedDocument, setDocument] = useState(null); // State for document

  const handleSignUp = () => {
    navigation.navigate("SignIn");
  };

  // const handleDocumentUpload = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: "application/pdf",
  //     });
  //     setDocument({ name: result.assets[0].name });
  //   } catch (error) {
  //     console.error("Error picking document:", error);
  //   }
  // };
  const handleDocumentUpload = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        console.error("Permission denied");
        return;
      }

      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      // console.log("Document picked:", result);

      if (!result.canceled) {
        setDocument(result);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../../assets/workerBackgroundImage.jpg")}
      style={styles.backgroundImage}
      onLoad={() => setImageLoaded(true)}
    >
      <BackButton />
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handlePress} style={styles.container}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {!imageLoaded ? (
            // Show loading indicator or any content while the image is loading
            <ActivityIndicator size="large" color="#00716F" />
          ) : (
            <>
              <Text style={styles.title}>Create Your {data} Account</Text>

              <Text
                style={[styles.inputRole, styles.input]}
                placeholder="Role"
                value={role}
                placeholderTextColor="#FFF"
                onChangeText={setRole}
              >
                {data}
              </Text>
              <TextInput
                style={[styles.input, styles.textStyling]}
                placeholder="First Name"
                value={firstname}
                placeholderTextColor="#FFF"
                onChangeText={setFirstName}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastname}
                placeholderTextColor="#FFF"
                onChangeText={setLastName}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="User Name"
                value={username}
                placeholderTextColor="#FFF"
                onChangeText={setUserName}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                value={email}
                placeholderTextColor="#FFF"
                onChangeText={setEmail}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                placeholderTextColor="#FFF"
                onChangeText={setPassword}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                placeholderTextColor="#FFF"
                onChangeText={setConfirmPassword}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                placeholderTextColor="#FFF"
                onChangeText={setCity}
                autoCorrect={false}
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                placeholderTextColor="#FFF"
                onChangeText={setAddress}
                autoCorrect={false}
                autoCapitalize="none"
              />

              <View style={styles.documentContainer}>
                <TouchableOpacity
                  style={styles.documentButton}
                  onPress={handleDocumentUpload}
                >
                  <Text style={styles.documentButtonText}>Choose Document</Text>
                </TouchableOpacity>
                {uploadedDocument && (
                  <Text style={styles.documentName}>
                    {uploadedDocument.name}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  signUpConstructor({
                    firstname,
                    lastname,
                    username,
                    email,
                    password,
                    confirmPassword,
                    city,
                    address,
                    uploadedDocument,
                  });
                }}
              >
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
  backgroundImage: {
    flex: 1,
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
  textStyling: {
    fontWeight: "bold",
  },
  navbar: {
    height: 60,
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  inputRole: {
    color: "white",
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
    width: "80%",
    borderWidth: 3,
    backgroundColor: "rgba(169, 169, 169, 0.3)", // Greyish color with transparency,
    fontWeight: "bold",
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
    backgroundColor: "#00716F",
    width: "40%",
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
    fontWeight: "bold",
  },
  documentName: {
    marginTop: 10,
    fontSize: 14,
    color: "#00716F",
  },
});

export default SignUp;
