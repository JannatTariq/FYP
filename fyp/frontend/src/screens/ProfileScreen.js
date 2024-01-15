import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BackButton from "../Components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const userProjects = [
    {
      id: 1,
      projectName: "Project 1",
      projectDetails: [
        {
          heading: "Description",
          value: "Project in Lahore.",
        },
        { heading: "Area", value: "200 sq. ft." },
        { heading: "Expected Price", value: "Rs.5,00,000" },
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
          value: "Project in Wapda Town",
        },
        { heading: "Area", value: "150 sq. ft." },
        { heading: "Expected Price", value: "Rs.4,00,000" },
        { heading: "No. of Bedrooms", value: "2" },
        { heading: "No. of Bathrooms", value: "1" },
      ],
    },
    // Add more projects as needed
  ];

  const userInfo = {
    avatarUri: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
    name: "Alien",
    email: "Alien@example.com",
    location: "Cantt",
    bio: "I am Client.",
  };
  const handlePress = () => {
    navigation.goBack();
  };
  const handleLogOut = () => {
    navigation.navigate("SignIn");
  };
  //   return (
  //     <ScrollView contentContainerStyle={styles.container}>
  //       <View style={styles.navbar}>
  //         <TouchableOpacity onPress={handlePress} style={styles.barContainer}>
  //           <Ionicons name="arrow-back-outline" size={24} color="#004d40" />
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.avatarContainer}>
  //         <Image source={{ uri: userInfo.avatarUri }} style={styles.avatar} />
  //         <Text style={styles.name}>{userInfo.name}</Text>
  //       </View>
  //       <View style={styles.infoContainer}>
  //         <Text style={styles.infoLabel}>Email:</Text>
  //         <Text style={styles.infoValue}>{userInfo.email}</Text>
  //       </View>
  //       <View style={styles.infoContainer}>
  //         <Text style={styles.infoLabel}>Location:</Text>
  //         <Text style={styles.infoValue}>{userInfo.location}</Text>
  //       </View>
  //       <View style={styles.infoContainer}>
  //         <Text style={styles.infoLabel}>Bio:</Text>
  //         <Text style={styles.infoValue}>{userInfo.bio}</Text>
  //       </View>

  //       <View style={styles.projectsContainer}>
  //         <Text style={styles.projectsHeading}>My Projects</Text>
  //         <FlatList
  //           data={userProjects}
  //           keyExtractor={(item) => item.id.toString()}
  //           renderItem={({ item }) => (
  //             <View style={styles.projectCard}>
  //               <Text style={styles.projectName}>{item.projectName}</Text>
  //               <FlatList
  //                 data={item.projectDetails}
  //                 keyExtractor={(detail) => detail.heading}
  //                 renderItem={({ item: detail }) => (
  //                   <View style={styles.projectDetail}>
  //                     <Text style={styles.detailHeading}>{detail.heading}:</Text>
  //                     <Text style={styles.detailValue}>{detail.value}</Text>
  //                   </View>
  //                 )}
  //               />
  //             </View>
  //           )}
  //         />
  //       </View>
  //     </ScrollView>
  //   );
  // };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={[{ key: "profile" }]}
      renderItem={({ item }) => (
        <View key={item.key}>
          <View style={styles.navbar}>
            <TouchableOpacity onPress={handlePress} style={styles.barContainer}>
              <Ionicons name="arrow-back-outline" size={24} color="#004d40" />
            </TouchableOpacity>
          </View>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userInfo.avatarUri }} style={styles.avatar} />
            <Text style={styles.name}>{userInfo.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userInfo.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>{userInfo.location}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Bio:</Text>
            <Text style={styles.infoValue}>{userInfo.bio}</Text>
          </View>

          <View style={styles.projectsContainer}>
            <Text style={styles.projectsHeading}>My Projects</Text>
            <FlatList
              data={userProjects}
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
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#00716F",
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
  },
  projectsContainer: {
    marginTop: 20,
  },
  projectsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#00716F",
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
});

export default ProfileScreen;
