import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NotificationAlert from "../Components/NotificationAlert";
import { useNavigation } from "@react-navigation/native"; // Import the necessary navigation hook

const Appointment = () => {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notification, setNotification] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null); // Unique ID for the appointment

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
    if (isFutureTime(time)) {
      setSelectedTime(time);
    } else {
      setNotification("Please select a future time.");
    }
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

  const handleSaveAppointment = () => {
    // Generate a unique ID for the appointment (you can use a library like uuid)
    const newAppointmentId = generateUniqueId();
    setAppointmentId(newAppointmentId);
    console.log(selectedDate);
    // Navigate to the next screen and pass the selected date, time, and ID
    navigation.navigate("ScheduleMeeting", {
      selectedDate,
      selectedTime,
      appointmentId: newAppointmentId,
    });
  };
  const generateUniqueId = () => {
    // You can use any method to generate a unique ID
    return Math.random().toString(36).substring(7);
  };
  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  return (
    <View style={styles.container}>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <Button title="Show Time Picker" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      {selectedDate && (
        <Text>Selected Date: {selectedDate.toDateString()}</Text>
      )}
      {selectedTime && (
        <Text>Selected Time: {selectedTime.toLocaleTimeString()}</Text>
      )}

      <Button title="Save Appointment" onPress={handleSaveAppointment} />

      {notification && (
        <NotificationAlert
          message={notification}
          onPress={handleNotificationPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Appointment;
