import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import StarRating from "../Components/StarRating";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Context as AuthContext } from "../context/authContext";

const UnBlockWorkerScreen = () => {
  const navigation = useNavigation();
  const { state, fetchWorkers, unblockWorker } = useContext(AuthContext);

  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      if (isFocused) {
        await fetchWorkers();
        // console.log(state.worker);
      }
    };

    fetchData();
  }, [isFocused, fetchWorkers]);

  const handleUnblockWorker = async (worker) => {
    // You can customize the alert message and actions as needed
    Alert.alert(
      "Unblock Worker",
      "Are you sure you want to unblock this worker?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Unblock",
          onPress: () => {
            unblockWorker({ id: worker._id });
            navigation.navigate("AdminHomeScreen");
          },
        },
      ]
    );
  };

  const capitalFirstLetter = (str) => {
    if (!str) return;
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderWorkerList = () => {
    if (state.worker !== undefined) {
      const roles = Object.keys(state.worker);

      return roles.map((role) => (
        <View key={role}>
          {state.worker[role] &&
            Array.isArray(state.worker[role]) &&
            state.worker[role].length > 0 && (
              <>
                {state.worker[role].map((worker) => (
                  <View key={worker._id}>
                    {worker.status === "blocked" && (
                      <View key={worker._id}>
                        <Text style={styles.subHeading}>
                          {capitalFirstLetter(`${role}s:`)}
                        </Text>
                        <View style={styles.workerInfo}>
                          <Text style={styles.workerName}>
                            {worker.username}
                          </Text>
                          <StarRating rating={worker.ratings} />
                        </View>
                        <TouchableOpacity
                          style={styles.unblockButton}
                          onPress={() => handleUnblockWorker(worker)}
                        >
                          <Text style={styles.buttonText}>Unblock</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))}
              </>
            )}
        </View>
      ));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Unblock Worker</Text>

      <ScrollView>{renderWorkerList()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  unblockButton: {
    backgroundColor: "#00716F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    marginTop: 10,
    textAlign: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "#f0f8ff",
    paddingBottom: 80, // Adjust paddingBottom to accommodate the bottom navigation bar
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    zIndex: 1,
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
  rating: {
    fontSize: 12,
    color: "#00716F",
    marginTop: 5,
  },
  workerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  workerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  workerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  unblockButton: {
    backgroundColor: "#00716F",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default UnBlockWorkerScreen;
