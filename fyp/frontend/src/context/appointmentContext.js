import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";
import api from "../api/api";

const appointmentReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { errorMessage: " ", errorMessage: action.payload };
    default:
      return state;
  }
};

const submitAppointment = (dispatch) => async () => {
  try {
    const authToken = await AsyncStorage.getItem("token");
    const response = await api.post("/submitAppointment", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Cannot submit appointemnt.",
    });
  }
};

export const { Provider, Context } = createDataContextap(
  appointmentReducer,
  {},
  []
);
