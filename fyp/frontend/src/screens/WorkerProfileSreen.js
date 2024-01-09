import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const WorkerProfileScreen = () => {
  const navigation = useNavigation();
  const workerProjects = [
    {
      id: 1,
      projectName: "Project 1",
      projectDetails: [
        {
          heading: "Description",
          value: "Property in Lahore.",
        },
        { heading: "Area", value: "200 sq. ft." },
        { heading: "Expected Price", value: "Rs. 50,000" },
        { heading: "No. of Bedrooms", value: "3" },
        { heading: "No. of Bathrooms", value: "2" },
      ],
    },
    {
      id: 2,
      projectName: "Project 2",
      projectDetails: [
        {
          heading: "Description",
          value: "Property in Wapda Town.",
        },
        { heading: "Area", value: "150 sq. ft." },
        { heading: "Expected Price", value: "$40,000" },
        { heading: "No. of Bedrooms", value: "2" },
        { heading: "No. of Bathrooms", value: "1" },
      ],
    },
    // Add more projects as needed
  ];

  const workerInfo = {
    avatarUri: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
    name: "Worker Name",
    email: "worker@example.com",
    location: "City, Country",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  };
  const handlePress = () => {
    navigation.goBack();
  };
  const handleLogOut = () => {
    navigation.navigate("SignIn");
  };
  return (
    <FlatList
      data={[{ key: "profile" }]}
      renderItem={({ item }) => (
        <View key={item.key} style={styles.container}>
          <View style={styles.navbar}>
            <TouchableOpacity onPress={handlePress} style={styles.barContainer}>
              <Ionicons name="arrow-back-outline" size={24} color="#004d40" />
            </TouchableOpacity>
          </View>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: workerInfo.avatarUri }}
              style={styles.avatar}
            />
            <Text style={styles.name}>{workerInfo.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{workerInfo.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>{workerInfo.location}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Bio:</Text>
            <Text style={styles.infoValue}>{workerInfo.bio}</Text>
          </View>

          <View style={styles.projectsContainer}>
            <Text style={styles.projectsHeading}>Projects</Text>
            <FlatList
              data={workerProjects}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.projectCard}>
                  <Text style={styles.projectName}>{item.projectName}</Text>
                  <FlatList
                    data={item.projectDetails}
                    keyExtractor={(detail) => detail.heading}
                    renderItem={({ item: detail }) => (
                      <View style={styles.projectDetail}>
                        <Text style={styles.detailHeading}>
                          {detail.heading}:
                        </Text>
                        <Text style={styles.detailValue}>{detail.value}</Text>
                      </View>
                    )}
                  />
                </View>
              )}
            />
          </View>
          <View style={styles.navbarLogOut}>
            <TouchableOpacity
              onPress={handleLogOut}
              style={styles.barContainerLogOut}
            >
              <AntDesign name="logout" size={24} color="black" />
              <Text style={styles.barText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f8ff", // Green texture background color
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  container1: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  navbarLogOut: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 10,
    paddingTop: 10,
  },
  barContainerLogOut: {
    flexDirection: "row",
    alignItems: "center",
  },
  barText: {
    marginLeft: 5,
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
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00716F",
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#00716F",
  },
  infoValue: {
    marginTop: 5,
    color: "black",
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
  projectsContainer: {
    marginTop: 20,
  },
  projectsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00716F",
    marginBottom: 10,
  },
  projectCard: {
    width: "100%",
    backgroundColor: "#d3f5e9",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  projectName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00716F",
    marginBottom: 8,
  },
  projectDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  detailHeading: {
    fontWeight: "bold",
    marginRight: 4,
    color: "#00716F",
  },
  detailValue: {
    flex: 1,
  },
  bidButton: {
    backgroundColor: "#00716F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  bidButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WorkerProfileScreen;
