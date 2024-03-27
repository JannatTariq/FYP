import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Context as ProposalContext } from "../context/proposalContext";
import { Context as AuthContext } from "../context/authContext";

const NotificationsScreen = () => {
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

    loadNotifications();

  }, []);

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
    };
    fetchUserId();
  }, []);


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
    };
    fetchUserId();
  }, [proposalBids]);

    // Update state using proposalBids function from ProposalContext
    proposalBids(updatedProposal);
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
          state.proposal.map((proposal) =>
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
  acceptButton: {
    backgroundColor: "green",
  },
  rejectButton: {
    backgroundColor: "red",
  },
});

export default NotificationsScreen;
