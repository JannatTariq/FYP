import React, { useContext, useState, useEffect } from "react";
import { Context as AppointmentContext } from "../context/appointmentContext";
import { Context as AuthContext } from "../context/authContext";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

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
    await acceptAppointment({ appointmentId });
  };

  const handleReject = async (appointmentId) => {
    await rejectAppointment({ appointmentId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Appointments</Text>
      {state.appointment &&
        state.appointment.map((appointment) =>
          appointment.userId === userId &&
          appointment.appointments.map((appointment) =>
            appointment.status !== "accepted" && (
              <View key={appointment._id} style={styles.appointmentItem}>
                <Text style={styles.appointmentId}>{appointment._id}</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAccept(appointment._id)}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleReject(appointment._id)}
                  >
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  appointmentItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  appointmentId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  rejectButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default WorkerAppointmentScreen;
