import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../Components/BackButton";
import { AntDesign } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/authContext";
import { Context as ProposalContext } from "../context/proposalContext";

const HomeScreen = () => {
  // Dummy data for worker recommendations

  const navigation = useNavigation();
  const { state } = useContext(ProposalContext);
  const { state: workerState, fetchWorkers } = useContext(AuthContext);
  // console.log(workerState.worker);

  // console.log(state.proposal);

  const workerRecommendations = [
    {
      id: 1,
      title: "Experienced Contractor",
      description: " Home renovations",
      image: require("../../assets/C.png"),
    },
    {
      id: 2,
      title: "Creative Architect",
      description: "Innovative Designs",
      image: require("../../assets/C.png"),
    },
    {
      id: 3,
      title: "Skilled Interior Designer",
      description: "Transforms Spaces ",
      image: require("../../assets/C.png"),
    },
    {
      id: 4,
      title: "Expert Electrician",
      description: " Electrical Solutions",
      image: require("../../assets/C.png"),
    },
    {
      id: 5,
      title: "Professional Contractor",
      description: "Expert in construction projects",
      image: require("../../assets/C.png"),
    },
    {
      id: 6,
      title: "Innovative Architect",
      description: "Modern Concepts to life",
      image: require("../../assets/C.png"),
    },
    // Add more worker recommendations as needed
  ];

  const tipsoftheWeek = [
    {
      id: 1,
      title: "Energy Saving Tips",
      description:
        "Switch to LED bulbs to save energy and reduce electricity costs.",
    },
    {
      id: 2,
      title: "Design Idea",
      description:
        "Try adding accent walls with bold colors to enhance the visual appeal of your rooms.",
    },
  ];

  const [recommendations, setRecommeßndations] = useState(
    workerRecommendations
  );
  const [currentTip, setCurrentTip] = useState(tipsoftheWeek[0]);
  // console.log(recommendations, currentTip);
  // const [recommendations, setRecommeßndations] = useState([]);
  // const [currentTip, setCurrentTip] = useState(tipsoftheWeek[0]);
  // useEffect(() => {
  //   setRecommeßndations(workerRecommendations);
  // }, []);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleRecommendationPress = (item) => {
    navigation.navigate("WPS_Client", { worker: item });
    // Implement navigation or other actions based on the selected worker
  };

  const capitalFirstLetter = (str) => {
    if (!str) return;
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const renderWorkerList = () => {
    if (workerState.worker !== undefined) {
      const roles = Object.keys(workerState.worker);

      return roles.map((role) => (
        <View key={role}>
          {workerState.worker[role] && workerState.worker[role].length > 0 && (
            <>
              <Text style={styles.subHeading}>
                {`${capitalFirstLetter(role)}s:`}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: "row" }}
              >
                {workerState.worker[role].map((worker) => (
                  <TouchableOpacity
                    key={worker._id}
                    style={styles.recommendationCard}
                    onPress={() => handleRecommendationPress(worker)}
                  >
                    <Image
                      source={require("../../assets/user.png")}
                      style={styles.recommendationImage}
                    />
                    <Text style={styles.recommendationTitle}>
                      {capitalFirstLetter(worker.username)}
                    </Text>
                    <Text style={styles.recommendationDescription}>
                      {worker.role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
        </View>
      ));
    }
  };

  const handleBidding = () => {
    navigation.navigate("Bidding", { data: state.proposal });
    // navigation.navigate("Bidding");
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to Your Home Page!</Text>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsHeading}>Tips of the Week</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>{currentTip.title}</Text>
            <Text style={styles.tipDescription}>{currentTip.description}</Text>
            <Text></Text>
          </View>
        </View>

        <Text style={styles.subHeading}></Text>
        {renderWorkerList()}

        {/* <Text style={styles.subHeading}>Recommended Architects:</Text>
        {renderWorkerList("Architect")}

        <Text style={styles.subHeading}>Recommended Interior Designers:</Text>
        {renderWorkerList("Interior Designer")} */}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarItem} onPress={handleBidding}>
          <Ionicons name="search" size={30} color="#00716F" />
          <Text>Properties</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={() => navigation.navigate("Proposal")}
        >
          <Ionicons name="add-circle" size={30} color="#00716F" />
          <Text>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Ionicons name="person" size={30} color="#00716F" />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
    textAlign: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "#f0f8ff",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 10,
    color: "#00716F",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#00716F",
  },
  recommendationCard: {
    width: 150,
    height: 200,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#00716F",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  recommendationImage: {
    width: "90%",
    height: "40%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  recommendationTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recommendationDescription: {
    fontSize: 12,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    paddingVertical: 10,
  },
  bottomBarItem: {
    alignItems: "center",
  },
  tipsContainer: {
    backgroundColor: "#d3f5e9",
    padding: 20,
    marginTop: 20,
  },
  tipsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tipCard: {
    borderWidth: 1,
    borderColor: "#00716F",
    borderRadius: 10,
    padding: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 14,
  },
});

export default HomeScreen;
