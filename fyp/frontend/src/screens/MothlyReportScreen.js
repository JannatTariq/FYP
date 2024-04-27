import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { Context as ProposalContext } from "../context/proposalContext";

const MonthlyReportScreen = () => {
  const [month, setMonth] = useState("");
  const [reportText, setReportText] = useState("");
  const { state, submitMonthlyReport } = useContext(ProposalContext);

  const handleSubmit = async () => {
    try {
      // await submitMonthlyReport();
      Alert.alert("Success", "Monthly report submitted successfully");
      setReportText(""); // Clear the report text input
    } catch (error) {
      Alert.alert("Error", "Failed to submit monthly report");
      console.error("Error submitting monthly report:", error);
    }
  };

  return (
    <View>
      <Text>Select Month:</Text>
      <Picker
        selectedValue={month}
        onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}
      >
        <Picker.Item label="January" value="January" />
        <Picker.Item label="February" value="February" />
        {/* Add more months as needed */}
      </Picker>
      <Text>Monthly Report:</Text>
      <TextInput
        value={reportText}
        onChangeText={setReportText}
        multiline={true}
        numberOfLines={4}
        style={{ height: 200, borderColor: "gray", borderWidth: 1 }}
      />
      <Button title="Submit Report" onPress={handleSubmit} />
    </View>
  );
};

export default MonthlyReportScreen;
