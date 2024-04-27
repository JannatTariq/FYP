import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Context as ProposalContext } from "../context/proposalContext";

const months = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

const MonthlyReportScreen = ({ route }) => {
  const [month, setMonth] = useState(null); // Initialize month state with null
  const [reportText, setReportText] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { bidderId, projectId } = route.params;
  const { state, submitMonthlyReport } = useContext(ProposalContext);
  // console.log(bidderId, projectId);

  const handleSubmit = async () => {
    try {
      // console.log(month._index, reportText);
      submitMonthlyReport({
        userId: bidderId,
        projectId,
        monthlyReport: reportText,
        month: month.value,
      });

      // Submit the monthly report
      Alert.alert("Success", "Monthly report submitted successfully");
      setReportText(""); // Clear the report text input
    } catch (error) {
      Alert.alert("Error", "Failed to submit monthly report");
      console.error("Error submitting monthly report:", error);
    }
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {month ? month.label : "Dropdown label"}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={months}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select month" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item);
          setMonth(item); // Set month based on the selected value
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
      <Text style={styles.label}>Monthly Report:</Text>
      <TextInput
        value={reportText}
        onChangeText={setReportText}
        multiline={true}
        numberOfLines={4}
        style={styles.input}
      />
      <Button title="Submit Report" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default MonthlyReportScreen;
