import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 20;

const UploadProposal = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [cardData, setCardData] = useState([
    { heading: "Address", value: "" },
    { heading: "Area", value: "" },
    { heading: "Expected Price", value: "" },
    { heading: "Bedrooms", value: "" },
    { heading: "Bathrooms", value: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState(null);

  const areaInputRef = useRef(null);
  const activityIndicatorColor = "#00716F";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        console.log("Image selection canceled");
      } else if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
  };

  const handleUpload = () => {
    const isEmptyField = cardData.some((item) => item.value.trim() === "");

    if (image && !isEmptyField) {
      const dataToSend = {
        image,
        address: cardData.find((item) => item.heading === "Address").value,
        area: cardData.find((item) => item.heading === "Area").value,

        price: cardData.find((item) => item.heading === "Expected Price").value,
        bedrooms: cardData.find((item) => item.heading === "Bedrooms").value,
        bathrooms: cardData.find((item) => item.heading === "Bathrooms").value,
      };

      setImage(null);
      setCardData([
        { heading: "Address", value: "" },
        { heading: "Area", value: "" },
        { heading: "Expected Price", value: "" },
        { heading: "Bedrooms", value: "" },
        { heading: "Bathrooms", value: "" },
      ]);

      setErrorMessage(null);

      navigation.navigate("Bidding", { data: dataToSend });

      console.log("Image:", image);
      console.log("Card Data:", cardData);
    } else {
      // Show error message if any field is empty
      setErrorMessage("Please fill out all fields.");
    }
  };

  const handlePriceChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setCardData((prevData) =>
      prevData.map((item) =>
        item.heading === "Expected Price"
          ? { ...item, value: `Rs. ${numericValue}` }
          : item
      )
    );
  };
  const handleBedroomChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setCardData((prevData) =>
      prevData.map((item) =>
        item.heading === "Bedrooms"
          ? { ...item, value: `${numericValue}` }
          : item
      )
    );
  };
  const handleBathroomChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setCardData((prevData) =>
      prevData.map((item) =>
        item.heading === "Bathrooms"
          ? { ...item, value: `${numericValue}` }
          : item
      )
    );
  };

  const handleAreaChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    const formattedValue = `${numericValue} sq.ft.`;
    const cursorPosition = numericValue.length;

    setCardData((prevData) =>
      prevData.map((item) =>
        item.heading === "Area" ? { ...item, value: formattedValue } : item
      )
    );
    areaInputRef.current &&
      areaInputRef.current.setNativeProps({
        selection: { start: cursorPosition, end: cursorPosition },
      });
  };

  const renderCard = (item, index) => (
    <View key={index} style={styles.card}>
      <Text style={styles.cardHeading}>{item.heading}</Text>
      <TextInput
        ref={item.heading === "Area" ? areaInputRef : null}
        style={styles.cardTextInput}
        placeholder={`Enter ${item.heading}`}
        value={item.value}
        onChangeText={(text) => {
          const newData = [...cardData];
          newData[index].value = text;
          setCardData(newData);
          if (item.heading === "Expected Price") {
            handlePriceChange(text);
          }
          if (item.heading === "Area") {
            handleAreaChange(text);
          }
          if (item.heading === "Bedrooms") {
            handleBedroomChange(text);
          }
          if (item.heading === "Bathrooms") {
            handleBathroomChange(text);
          }
        }}
        multiline={true}
        keyboardType={
          item.heading === "Expected Price" ||
          item.heading === "Bedrooms" ||
          item.heading === "Bathrooms" ||
          item.heading === "Area"
            ? "numeric"
            : "default"
        }
      />
    </View>
  );
  const handlePress = () => {
    navigation.goBack();
  };
  const renderCards = () =>
    Array.isArray(cardData)
      ? cardData.map((item, index) => renderCard(item, index))
      : null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handlePress} style={styles.container}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Enter Details of your House</Text>

          <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
            <Text style={styles.pickImageText}>Pick Image</Text>
          </TouchableOpacity>

          {image && (
            <View style={styles.imageCard}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          )}

          {renderCards()}
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>
        {isLoading && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color={activityIndicatorColor} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#004d40",
  },
  navbar: {
    height: 50,
    top: 20,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  navbarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004d40",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  imageCard: {
    width: CARD_WIDTH - 40,
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.7,
  },
  card: {
    width: CARD_WIDTH - 25,
    height: 100,
    backgroundColor: "#c2eed0",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginTop: 30,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 8,
  },
  cardTextInput: {
    overflow: "hidden",
    padding: 8,
    marginBottom: 8,
    minHeight: 50,
  },
  pickImageButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  pickImageText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  uploadButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    marginTop: 20,
    textTransform: "capitalize",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default UploadProposal;
