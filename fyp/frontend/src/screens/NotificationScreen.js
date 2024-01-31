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
  // console.log(state.proposal[1].userId);

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
  // console.log(state.proposals);

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
  // console.log("userId:", userId);
  // console.log("clientId:", clientId);
  // console.log(state.proposal.bids);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>

      {state.proposal &&
        state.proposal.map(
          (proposal, index) =>
            proposal.bids &&
            proposal.userId === userId &&
            proposal.bids.map(
              (bid) =>
                bid.status !== "accepted" && (
                  <View key={bid._id} style={styles.notificationItem}>
                    {/* <Text>{bid.bidderName.match(/username: '([^']+)'/)}</Text> */}
                    <TouchableOpacity
                      onPress={() => handleAcceptBid(proposal._id, bid._id)}
                    >
                      <Text style={styles.acceptButton}>
                        Accept Bid {capitalizeFirstLetter(bid.bidderName)}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleRejectBid(proposal._id, bid._id)}
                    >
                      <Text style={styles.rejectButton}>
                        Reject Bid {capitalizeFirstLetter(bid.bidderName)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
            )
        )}
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
  acceptButton: {
    color: "green",
    fontWeight: "bold",
  },
  rejectButton: {
    color: "red",
    fontWeight: "bold",
  },
});

export default NotificationsScreen;
