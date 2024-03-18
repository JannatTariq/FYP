import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Context as ProposalContext } from "../context/proposalContext";
import { Context as AuthContext } from "../context/authContext";

const NotificationsScreen = () => {
  const { state, acceptBid, rejectBid, fetchWorkerProposals, proposalBids } =
    useContext(ProposalContext);
  const { getUserId } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadNotifications = async () => {
      await fetchWorkerProposals();
    };
    loadNotifications();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        setUserId(id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        await proposalBids();
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();
  }, [proposalBids]);

  const handleAcceptBid = async (proposalId, bidId) => {
    await acceptBid({ proposalId, bidId });
  };

  const handleRejectBid = async (proposalId, bidId) => {
    await rejectBid({ proposalId, bidId });
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) {
      return "";
    }
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>

      <ScrollView>
        {state.proposal &&
          state.proposal.map((proposal, index) => (
            <View key={proposal._id} style={styles.notificationItem}>
              {proposal.bids &&
                proposal.userId === userId &&
                proposal.bids.map(
                  (bid) =>
                    bid.status !== "accepted" && (
                      <View key={bid._id} style={styles.bidItem}>
                        <Text style={styles.bidderName}>
                          Bidder: {capitalizeFirstLetter(bid.bidderName)}
                        </Text>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              handleAcceptBid(proposal._id, bid._id)
                            }
                            style={[styles.button, styles.acceptButton]}
                          >
                            <Text style={styles.buttonText}>Accept</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              handleRejectBid(proposal._id, bid._id)
                            }
                            style={[styles.button, styles.rejectButton]}
                          >
                            <Text style={styles.buttonText}>Reject</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                )}
            </View>
          ))}
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
  },
  notificationItem: {
    marginBottom: 20,
  },
  bidItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  bidderName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: "green",
  },
  rejectButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NotificationsScreen;
