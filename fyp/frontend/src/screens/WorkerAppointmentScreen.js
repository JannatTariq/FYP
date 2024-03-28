import React, { useContext, useState, useEffect } from "react";
import { Context as AppointmentContext } from "../context/appointmentContext";
import { Context as AuthContext } from "../context/authContext";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import BackButton from "../Components/BackButton";

const WorkerAppointmentScreen = () => {
  const [loading, setLoading] = useState(false);
  const { state, acceptAppointment, getAppointments, rejectAppointment } =
    useContext(AppointmentContext);

  const { getUserId } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        setUserId(id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      await getAppointments();
    };

    fetchAppointments();
  }, [getAppointments]);

  const handleAccept = async (appointmentId) => {
    // console.log(appointmentId);
    await acceptAppointment({ appointmentId });
  };

  const handleReject = async (appointmentId) => {
    await rejectAppointment({ appointmentId });
  };
  // console.log(state.appointemnt[0].userId, userId);

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.heading}>Appointments</Text>
      {state.appointemnt &&
        state.appointemnt?.map(
          (appointemnt) =>
            appointemnt.userId === userId &&
            appointemnt.appointments?.map(
              (appointments) =>
                appointments.status !== "accepted" && (
                  <View key={appointemnt._id}>
                    <Text style={{ color: "red" }}>{appointments._id}</Text>
                    <TouchableOpacity
                      onPress={() => handleAccept(appointments._id)}
                    >
                      <Text style={styles.acceptButton}>
                        Accept Appointment
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleReject(appointments._id)}
                    >
                      <Text style={styles.rejectButton}>
                        Reject Appointment
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
            )
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationItem: {
    marginBottom: 20,
    color: "red",
  },
  acceptButton: {
    color: "green",
    fontWeight: "bold",
  },
  rejectButton: {
    color: "red",
    fontWeight: "bold",
  },
});

export default WorkerAppointmentScreen;
