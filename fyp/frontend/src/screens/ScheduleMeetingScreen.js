// import React from "react";
// import { useRoute } from "@react-navigation/native";
// import { View, Text, StyleSheet } from "react-native";

// const ScheduleMeetingScreen = ({ selectedDate, selectedTime }) => {
//   console.log(selectedDate, selectedTime);
//   return (
//     <View style={styles.container}>
//       <Text>Appointment Details</Text>
//       <Text>Selected Date: {selectedDate?.toDateString()}</Text>
//       <Text>Selected Time: {selectedTime?.toLocaleTimeString()}</Text>
//       {/* <Text>Appointment ID: {appointmentId}</Text> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default ScheduleMeetingScreen;
import React from "react";
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const ScheduleMeetingScreen = () => {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/bg.png")}
        resizeMode="stretch"
        style={styles.img}
      >
        <TextInput placeholder="Geeks for Geeks" style={styles.input} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
  },
});
export default ScheduleMeetingScreen;
