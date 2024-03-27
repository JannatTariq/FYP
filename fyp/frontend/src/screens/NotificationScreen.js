import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Context as ProposalContext } from "../context/proposalContext";
import { Context as AuthContext } from "../context/authContext";

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const { state, acceptBid, rejectBid, fetchWorkerProposals, proposalBids } =
    useContext(ProposalContext);
  const { getUserId } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchWorkerProposals();
      const id = await getUserId();
      setUserId(id);
      await proposalBids();
    };
    fetchData();
  }, []);
  const handlePress = () => {
    navigation.goBack();
  };
  const submitBid = async (action, proposalId, bidId, bidPrice) => {
    try {
      if (action === "accept") {
        await acceptBid({ proposalId, bidId });
        removeBid(proposalId, bidId);
        Alert.alert("Bid Accepted", `Bid Price: ${bidPrice}`);
      } else if (action === "reject") {
        await rejectBid({ proposalId, bidId });
        removeBid(proposalId, bidId);
        Alert.alert("Bid Rejected", `Bid Price: ${bidPrice}`);
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
      Alert.alert("Error", "An error occurred while submitting the bid.");
    }
  };

  const removeBid = (proposalId, bidId) => {
    const updatedProposal = state.proposal.map((proposal) => {
      if (proposal._id === proposalId) {
        return {
          ...proposal,
          bids: proposal.bids.filter((bid) => bid._id !== bidId),
        };
      }
      return proposal;
    });

    // Update state using proposalBids function from ProposalContext
    proposalBids(updatedProposal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handlePress} style={styles.barContainer}>
          <Ionicons name="arrow-back-outline" size={24} color="#004d40" />
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Notifications</Text>

      <ScrollView>
        {state.proposal &&
          state.proposal.map(
            (proposal) =>
              proposal.bids &&
              proposal.userId === userId &&
              proposal.bids.map((bid) => (
                <View key={bid._id} style={styles.notificationItem}>
                  <Text style={styles.bidderName}>{bid.bidderName}</Text>
                  <Text style={styles.bidAmount}>Bid Amount: {bid.price}</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.acceptButton]}
                      onPress={() =>
                        submitBid("accept", proposal._id, bid._id, bid.price)
                      }
                    >
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.rejectButton]}
                      onPress={() =>
                        submitBid("reject", proposal._id, bid._id, bid.price)
                      }
                    >
                      <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
          )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  notificationItem: {
    marginBottom: 20,
    marginLeft: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  bidderName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  bidAmount: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  acceptButton: {
    backgroundColor: "green",
  },
  barContainer: {
    flex: 1,
    // backgroundColor: "#004d40",
  },
  navbar: {
    height: 50,
    top: 20,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  rejectButton: {
    backgroundColor: "red",
  },
});

export default NotificationsScreen;
