import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";
import api from "../api/api";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { errorMessage: " ", errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({
    type: "clear_error_message",
  });
};

const signIn =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await api.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "signin",
        payload: response.data.token,
      });
      navigate("Transaction");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Invalid Email or Password",
      });
    }
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, clearErrorMessage },
  { token: null, errorMessage: "" }
);
