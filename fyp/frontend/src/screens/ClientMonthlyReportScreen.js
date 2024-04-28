import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as ProposalContext } from "../context/proposalContext";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const months = [
  { label: "Select Month", value: null },
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

const ClientMonthlyReportScreen = ({ route }) => {
  const { state, getMonthlyReport } = useContext(ProposalContext);
  const { bidderId, projectId } = route.params;
  const [isFocus, setIsFocus] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [value, setValue] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    getMonthlyReport({ userId: bidderId, projectId });
  }, []);

  useEffect(() => {
    setAllReports(state.proposal);
  }, [state.proposal]);

  useEffect(() => {
    if (selectedMonth) {
      const filtered = allReports.map((report) => ({
        ...report,
        monthlyReports: report.monthlyReports.filter(
          (item) => item.month === selectedMonth
        ),
      }));
      setFilteredReports(filtered);
    } else {
      setFilteredReports(allReports);
    }
  }, [selectedMonth, allReports]);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {selectedMonth ? selectedMonth.label : "Dropdown label"}
        </Text>
      );
    }
    return null;
  };

  const handleChange = (item) => {
    setSelectedMonth(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Monthly Reports</Text>
      <View style={styles.dropdownContainer}>
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
            handleChange(item.value);
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
      </View>
      <View style={styles.reportContainer}>
        {filteredReports.map(
          (reports, index) =>
            reports._id === projectId && (
              <View key={index}>
                {reports.monthlyReports.map((report) => (
                  <View key={report._id} style={styles.report}>
                    <Text>Month: {report.month}</Text>
                    <Text>Year: {report.year}</Text>
                    <Text>Report: {report.reportText}</Text>
                    <Text>Submitted At: {report.submittedAt}</Text>
                  </View>
                ))}
              </View>
            )
        )}
        {filteredReports.length === 0 && (
          <Text>No reports available for this period</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdownContainer: {
    marginTop: 100,
    backgroundColor: "white",
    padding: 16,
  },
  reportContainer: {
    marginBottom: 20,
  },
  report: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownItem: {
    paddingVertical: 12,
  },
  dropdownLabel: {
    fontSize: 16,
    color: "#000",
  },
  activeDropdownItem: {
    backgroundColor: "#f0f0f0",
  },
  activeDropdownLabel: {
    color: "blue",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 4,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dropdownList: {
    marginTop: 4,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default ClientMonthlyReportScreen;
