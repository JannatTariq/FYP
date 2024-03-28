// import React, { useContext, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { Context as AuthContext } from "../context/authContext";
// import { Context as AppointmentContext } from "../context/appointmentContext";

// const MeetingsScreen = () => {
//   const { state, getAppointments } = useContext(AppointmentContext);
//   const { getUserId } = useContext(AuthContext);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const id = await getUserId();
//         setUserId(id);

//         await getAppointments();
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     loadData();
//   }, []);

//   //   console.log(state.appointemnt);
//   return (
//     <View style={{ flex: 1, marginTop: 100 }}>
//       <Text style={styles.projectName}>Meetings</Text>
//       {state.appointemnt &&
//         state.appointemnt?.map(
//           (appointemnt) =>
//             appointemnt.appointments &&
//             appointemnt.appointments?.map(
//               (meetings) =>
//                 meetings.clientId === userId &&
//                 meetings.status === "accepted" && (
//                   <View key={appointemnt._id}>
//                     <Text style={{ color: "red" }}>
//                       Meetings {appointemnt.userId} {meetings.time}{" "}
//                     </Text>
//                     <TouchableOpacity>
//                       <Text style={{ color: "blue" }}>Close</Text>
//                     </TouchableOpacity>
//                   </View>
//                 )
//             )
//         )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   notificationItem: {
//     marginBottom: 20,
//   },
//   projectName: {
//     fontSize: 36,
//     fontWeight: "bold",
//     marginBottom: 5,
//     color: "#00716F", // Dark green text color
//   },
//   projectDescription: {
//     fontSize: 14,
//     color: "#333", // Dark gray text color
//   },
// });

// export default MeetingsScreen;
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/authContext";
import { Context as AppointmentContext } from "../context/appointmentContext";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatTime = (timeString) => {
  const time = new Date(timeString);
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
const MeetingBox = ({ name, date, time, userId, onRemove }) => (
  <View style={styles.meetingBox}>
    <View>
      <Text style={styles.heading}>Meeting</Text>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Date: {formatDate(date)}</Text>
      <Text style={styles.text}>
        Time: {formatTime(time)}
        {/* {console.log(date, time)} */}
      </Text>
    </View>
    <TouchableOpacity onPress={onRemove}>
      <Text style={{ color: "blue" }}>Close</Text>
    </TouchableOpacity>
  </View>
);

const MeetingsScreen = ({ route }) => {
  const { state, getAppointments } = useContext(AppointmentContext);
  const { getUserId } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [displayedAppointments, setDisplayedAppointments] = useState([]);
  const { workerData } = route.params;
  // console.log(selectedDate, selectedTime);
  useEffect(() => {
    const loadData = async () => {
      try {
        const id = await getUserId();
        setUserId(id);

        await getAppointments();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  // console.log(workerData._id, displayedAppointments[0]?.userId);
  const removeAppointment = (appointmentId) => {
    setDisplayedAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment._id !== appointmentId
      )
    );
  };

  useEffect(() => {
    if (state.appointemnt) {
      setDisplayedAppointments(state.appointemnt);
    }
  }, [state.appointemnt]);

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Text style={styles.projectName}>Meetings</Text>
      {displayedAppointments &&
        displayedAppointments.map(
          (appointment) =>
            workerData._id === appointment.userId &&
            Array.isArray(appointment.appointments) &&
            appointment.appointments.map(
              (meeting) =>
                meeting.clientId === userId &&
                meeting.status === "accepted" && (
                  <MeetingBox
                    key={meeting._id}
                    name={workerData.username}
                    date={meeting.date}
                    time={meeting.time}
                    onRemove={() => removeAppointment(appointment._id)}
                  />
                )
            )
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  meetingBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8, // Add border radius for card-like container
  },
  projectName: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00716F", // Dark green text color
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Dark gray heading color
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666", // Dark gray text color
  },
});

export default MeetingsScreen;
