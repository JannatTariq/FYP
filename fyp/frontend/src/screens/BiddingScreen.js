import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import BackButton from "../Components/BackButton";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 20;

const BiddingScreen = ({ route }) => {
  const { data } = route.params;
  console.log("Image:", data.image);
  console.log("Card Data:", data.area);
  console.log("Card Data:", data.bedrooms);
  console.log("Card Data:", data.bathrooms);
  console.log("Card Data:", data.address);
  console.log("Card Data:", data.price);

  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };
  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <View style={styles.card}>
        <Image source={{ uri: data.image }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.price}>{data.price}</Text>
          <Text style={styles.address}>{data.address}</Text>
          <Text style={styles.squareMeters}>{data.area}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.beds}>{data.bedrooms} beds</Text>
          <Text style={styles.baths}>{data.bathrooms} baths</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#004d40",
  },
  searchInputContainer: {
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#c2eed0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    height: CARD_WIDTH - 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  cardContent: {
    padding: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
  },
  squareMeters: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },
  cardFooter: {
    padding: 10,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "black",
    justifyContent: "space-between",
  },
  beds: {
    fontSize: 14,
    color: "blue",
    fontWeight: "bold",
  },
  baths: {
    fontSize: 14,
    color: "blue",
    fontWeight: "bold",
  },
});

export default BiddingScreen;
