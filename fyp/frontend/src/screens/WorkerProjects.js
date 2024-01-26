import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Context as ProposalContext } from "../context/proposalContext";
import { Context as AuthContext } from "../context/authContext";

const WorkerProjectsScreen = () => {
  const { state, proposalBids } = useContext(ProposalContext);
  const { getUserId } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch worker proposals
        // await fetchWorkerProposals();

        // Fetch user ID
        const id = await getUserId();
        setUserId(id);

        // Fetch proposal bids
        await proposalBids();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

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
    <View>
      <Text>Your Projects</Text>
      {state.proposal &&
        state.proposal.map(
          (proposal, index) =>
            proposal.bids &&
            proposal.bids.map(
              (bid) =>
                bid.userId === userId &&
                bid.status === "accepted" && (
                  <View key={bid._id} style={styles.notificationItem}>
                    <Text style={styles.projectName}>
                      {capitalizeFirstLetter(proposal.username)}
                    </Text>
                    <Image
                      source={{ uri: proposal?.image }}
                      style={{ width: 100, height: 100 }}
                    />
                    <Text style={styles.projectDescription}>
                      {proposal?.address}
                      {"\n"}
                      {proposal?.area}
                      {"\n"}
                      {proposal?.price}
                      {"\n"}
                      {proposal?.bedroom}
                      {"\n"}
                      {proposal?.bathroom}
                    </Text>
                  </View>
                )
            )
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    marginBottom: 20,
  },
  projectName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#00716F", // Dark green text color
  },
  projectDescription: {
    fontSize: 14,
    color: "#333", // Dark gray text color
  },
});

export default WorkerProjectsScreen;
