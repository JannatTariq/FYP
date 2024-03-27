import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Context as ProposalContext } from "../context/proposalContext";
import { Context as AuthContext } from "../context/authContext";

const WorkerHomeScreen = () => {
  const navigation = useNavigation();

  const { state, fetchWorkerProposals } = useContext(ProposalContext);
  const { state: authState, signOut, userProfile } = useContext(AuthContext);

  useEffect(() => {
    fetchWorkerProposals();
  }, [fetchWorkerProposals]);
  useEffect(() => {
    // Fetch user profile data when component mounts
    userProfile();
  }, []);

  const handleBidding = () => {
    navigation.navigate("BiddingSearchScreen");
  };

  const renderProjectList = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {state.proposal?.map((proposal, index) => (
          <TouchableOpacity
            key={proposal._id}
            style={styles.projectCard}
            onPress={() =>
              navigation.navigate("BidToProposal", { proposal, index })
            }
          >
            <Text style={styles.projectName}>Project {index + 1}</Text>
            <Text style={[styles.projectName, styles.bold]}>
              {capitalizeFirstLetter(proposal.username)}
            </Text>
            <Image
              source={{ uri: proposal?.image }}
              style={styles.projectImage}
            />
            <Text style={styles.projectDescription}>
              <Text style={styles.bold}>Address: </Text>
              {`${capitalizeFirstLetter(proposal.address)}\n`}
              <Text style={styles.bold}>Area: </Text>
              {`${proposal.area}\n`}
              <Text style={styles.bold}>Price: </Text>
              {`${proposal.price}\n`}
              <Text style={styles.bold}>Bedrooms: </Text>
              {`${proposal.bedroom}\n`}
              <Text style={styles.bold}>Bathrooms: </Text>
              {`${proposal.bathroom}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
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
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome Home {authState.username}!</Text>

        <View style={styles.tipContainer}>
          <Text style={styles.tipHeading}>Tip of the Day</Text>
          <Text style={styles.tipText}>
            Always ensure to communicate effectively with clients to understand
            their project requirements thoroughly.
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.subContainer}>
          <Text style={styles.subHeading}>Client's Projects:</Text>
          {renderProjectList()}
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarItem} onPress={handleBidding}>
          <Ionicons name="search" size={30} color="#00716F" />
          <Text style={styles.bottomBarText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={() => navigation.navigate("WorkerProfileScreen")}
        >
          <Ionicons name="person" size={30} color="#00716F" />
          <Text style={styles.bottomBarText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    marginTop: 0,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 10,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    flex: 1,
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#00716F",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#00716F",
  },
  projectCard: {
    width: 170,
    height: 270,
    marginRight: 15,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 20, // Rounded top left corner
    borderTopRightRadius: 20, // Rounded top right corner
    borderWidth: 1,
    borderColor: "#eee", // Lighter border color
  },
  projectName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#00716F",
  },
  projectImage: {
    width: "100%",
    height: 100,
    marginBottom: 5,
    borderRadius: 5,
  },
  projectDescription: {
    fontSize: 14,
    color: "#333",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bottomBarItem: {
    alignItems: "center",
  },
  bottomBarText: {
    color: "#00716F",
  },
  tipContainer: {
    backgroundColor: "#d3f5e9",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  tipHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#00716F",
  },
  tipText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  username: {
    color: "#FF5733", // Example color
  },
  bold: {
    fontWeight: "bold",
  },
});

export default WorkerHomeScreen;
