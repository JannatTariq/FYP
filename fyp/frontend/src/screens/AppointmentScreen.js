import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NotificationAlert from "../Components/NotificationAlert";
import * as Notifications from "expo-notifications";
import BackButton from "../Components/BackButton";
import { useNavigation } from "@react-navigation/native";

const AppointmentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { workerInfo } = route.params;
  console.log(workerInfo);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);
  const activityIndicatorColor = "#00716F";
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const isFutureDate = (date) => {
    const currentDate = new Date();
    return date > currentDate;
  };

  const handleDateConfirm = (date) => {
    if (isFutureDate(date)) {
      setSelectedDate(date);
    } else {
      setNotification("Please select a future date.");
    }
    hideDatePicker();
  };

  const isFutureTime = (time) => {
    const currentTime = new Date();
    const selectedDateTime = new Date(time);
    return selectedDateTime > currentTime;
  };

  const handleTimeConfirm = (time) => {
    // if (isFutureTime(time)) {
    setSelectedTime(time);
    // } else {
    //   setNotification("Please select a future time.");
    // }
    hideTimePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleNotificationPress = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  const sendNotification = async () => {
    console.log("pressed");
    navigation.navigate("Transaction");
    if (selectedDate && selectedTime) {
      const schedulingOptions = {
        content: {
          title: `Appointment Scheduled`,
          body: `You have an appointment with ${
            workerInfo.name
          } on ${selectedDate.toDateString()} at ${selectedTime.toLocaleTimeString()}.`,
        },
        trigger: {
          seconds: 1,
          channelId: "appointments",
        },
      };
      await Notifications.scheduleNotificationAsync(schedulingOptions);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.upperHalf}>
        <Text style={styles.heading}>Schedule Appointment</Text>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={require("../../assets/user.png")}
          />
          <Text style={styles.nameText}>Worker Name</Text>
        </View>
      </View>
      <View style={styles.lowerHalf} />

      <Text style={styles.subHeading}>Date and Time</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.cardInfoContainer}>
          <View style={styles.cardInfoItem}>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.cardInfoLabel}>Pick Date</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
            {selectedDate && (
              <View style={styles.cardInfoValueContainer}>
                <Text style={styles.cardInfoValue}>
                  {selectedDate.toDateString()}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.cardInfoItem}>
            <TouchableOpacity onPress={showTimePicker}>
              <Text style={styles.cardInfoLabelExpiration}>Pick Time</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
            {selectedTime && (
              <View style={styles.cardInfoValueExpirationContainer}>
                <Text style={styles.cardInfoValueExpiration}>
                  {selectedTime.toLocaleTimeString()}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={sendNotification}>
        <Text style={styles.buttonText}>Transaction</Text>
      </TouchableOpacity>
      {notification && (
        <NotificationAlert
          message={notification}
          onPress={handleNotificationPress}
        />
      )}
      {isLoading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={activityIndicatorColor} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
  },
  upperHalf: {
    flex: 1.3,
    backgroundColor: "#00716F",
    width: "100%",
  },
  lowerHalf: {
    flex: 0.2,

    width: "100%",
  },
  cardInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardInfoItem: {
    // flex: 1,
  },
  cardInfoLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00716F",
    marginRight: 150,
    marginTop: 80,
  },
  cardInfoLabelExpiration: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00716F",
    marginTop: 78,
  },
  cardInfoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00716F",
    marginTop: 12,
  },
  cardInfoValueExpiration: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00716F",
    marginTop: 14,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#00716F",
  },
  heading: {
    fontSize: 25,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginTop: 110,
    marginBottom: 25,
    // fontStyle: "italic",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00716F",
    // fontStyle: "italic",
    // padding: 20,
    marginTop: 80,
  },
  buttonContainer: {
    flex: 2,
    justifyContent: "space-between",
  },
  selectedDateTime: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00716F",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 50,
    width: "60%",
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default AppointmentScreen;
