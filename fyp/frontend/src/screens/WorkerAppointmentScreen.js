import React, { useContext, useState, useEffect } from "react";
import { Context as AppointmentContext } from "../context/appointmentContext";
import { Context as AuthContext } from "../context/authContext";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import BackButton from "../Components/BackButton";

const WorkerAppointmentScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const { state, acceptAppointment, getAppointments, rejectAppointment } =
    useContext(AppointmentContext);

  const { getUserId, workerProfile, userProfile } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const { worker } = route.params;
  // console.log(worker);

  const [clientNames, setClientNames] = useState({});

  const activityIndicatorColor = "#00716F";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        setUserId(id);

        // const workerProfileData = workerProfile({ id: worker });
        // setWorkerProfileData(workerProfileData);
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

  useEffect(() => {
    const fetchClientNames = async () => {
      const names = {};
      if (state.appointemnt) {
        for (const appointment of state.appointemnt) {
          if (appointment.userId === userId && appointment.appointments) {
            for (const appointmentItem of appointment.appointments) {
              if (
                appointmentItem.status !== "accepted" &&
                appointmentItem.status !== "rejected"
              ) {
                const clientName = await workerProfile({
                  id: appointmentItem.clientId,
                });
                names[appointmentItem._id] = clientName.username;
              }
            }
          }
        }
      }
      setClientNames(names);
    };

    fetchClientNames();
  }, [state.appointemnt]);

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

  const handleAccept = async (appointmentId) => {
    await acceptAppointment({ appointmentId });
  };

  const handleReject = async (appointmentId) => {
    await rejectAppointment({ appointmentId });
  };

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
                  <View key={appointemnt._id} style={styles.card}>
                    {/* <Text style={styles.name}>
                      {workerProfileData?._j?.username}
                    </Text> */}

        state.appointemnt.map(
          (appointment) =>
            appointment.userId === userId &&
            appointment.appointments &&
            appointment.appointments.map((appointmentItem) => {
              if (
                appointmentItem.status !== "accepted" &&
                appointmentItem.status !== "rejected"
              ) {
                return (
                  <View key={appointmentItem._id} style={styles.card}>
                    <Text style={styles.dateTime}>
                      {clientNames[appointmentItem._id]}
                    </Text>

                    <Text style={styles.dateTime}>
                      Date: {formatDate(appointmentItem.date)}
                    </Text>
                    <Text style={styles.dateTime}>
                      Time: {formatTime(appointmentItem.time)}
                    </Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.button, styles.acceptButton]}
                        onPress={() => handleAccept(appointmentItem._id)}
                      >
                        <Text style={styles.buttonText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, styles.rejectButton]}
                        onPress={() => handleReject(appointmentItem._id)}
                      >
                        <Text style={styles.buttonText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
              return null;
            })
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
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 60,
    color: "#00716F",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: "green",
    marginRight: 5,
  },
  rejectButton: {
    backgroundColor: "red",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default WorkerAppointmentScreen;
