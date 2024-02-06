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

const MeetingBox = ({ appointment, userId, onRemove }) => (
  <View style={styles.meetingBox}>
    <Text style={{ color: "red" }}>Meetings {appointment.userId} </Text>
    <TouchableOpacity onPress={onRemove}>
      <Text style={{ color: "blue" }}>Close</Text>
    </TouchableOpacity>
  </View>
);

const MeetingsScreen = () => {
  const { state, getAppointments } = useContext(AppointmentContext);
  const { getUserId } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [displayedAppointments, setDisplayedAppointments] = useState([]);

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

  const removeAppointment = (appointmentId) => {
    console.log(appointmentId);
    // Hide the appointment with the given appointmentId
    setDisplayedAppointments((prevAppointment) => ({
      ...prevAppointment,
      hidden: true,
    }));
  };

  useEffect(() => {
    // Update displayedAppointments when state.appointment changes
    if (state.appointemnt) {
      setDisplayedAppointments(state.appointemnt);
    }
  }, [state.appointemnt]);

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Text style={styles.projectName}>Meetings</Text>
      {state.appointemnt &&
        state.appointemnt.map((appointment) => (
          <MeetingBox
            key={appointment._id}
            appointment={appointment}
            onRemove={() => removeAppointment(appointment._id)}
          />
        ))}
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
  },
  projectName: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#00716F", // Dark green text color
  },
});

export default MeetingsScreen;
