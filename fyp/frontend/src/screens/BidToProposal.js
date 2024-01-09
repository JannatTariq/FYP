import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import BackButton from "../Components/BackButton";
import Modal from "react-native-modal";

const BidToProposal = ({ route }) => {
  const { projectName, projectDetails, clientName } = route.params;

  const [bidPrice, setBidPrice] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBidButtonPressed, setBidButtonPressed] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setBidButtonPressed(false);
    setBidPrice("");
  };

  const handleBidPress = () => {
    setBidButtonPressed(true);
    toggleModal();
  };

  const submitBid = () => {
    if (bidPrice) {
      Alert.alert("Bid Submitted", `Bid Price: ${bidPrice}`);
    } else {
      Alert.alert("Bid Canceled", "You canceled the bid.");
    }
    toggleModal();
  };

  return (
    <View style={styles.cardContainer}>
      <BackButton />
      <View style={styles.card}>
        <Text style={styles.mainHeading}>{projectName}</Text>
        <Text style={styles.clientName}>{clientName}</Text>

        <Text style={styles.description}>{projectDetails.description}</Text>
        <Text style={styles.detailsText}>Area: {projectDetails.area}</Text>
        <Text style={styles.detailsText}>
          Address: {projectDetails.location}
        </Text>
        <Text style={styles.detailsText}>
          Expected Price: {projectDetails.expectedPrice}
        </Text>
        <Text style={styles.detailsText}>
          Bedrooms: {projectDetails.bedrooms}
        </Text>
        <Text style={styles.detailsText}>
          Bathrooms: {projectDetails.bathrooms}
        </Text>

        <TouchableOpacity
          style={[
            styles.bidButton,
            isBidButtonPressed && styles.bidButtonPressed,
          ]}
          onPress={handleBidPress}
        >
          <Text style={styles.bidButtonText}>Bid Now</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Enter Bid Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Bid Price"
            keyboardType="numeric"
            value={bidPrice}
            onChangeText={(text) => setBidPrice(text)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={submitBid}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 20,
    justifyContent: "center",
    // alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  mainHeading: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    // textAlign: "center",
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
    // textAlign: "center",
  },
  bidButton: {
    backgroundColor: "#00716F",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    // alignSelf: "center",
  },
  bidButtonPressed: {
    paddingTop: 10,
  },
  bidButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#00716F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BidToProposal;
