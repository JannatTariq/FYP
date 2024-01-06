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

const signUp =
  (dispatch) =>
  async ({ username, email, password, confirmPassword, address }) => {
    try {
      const response = await api.post("/signupClient", {
        username,
        email,
        password,
        confirmPassword,
        address,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });

      navigate("Transaction");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with the signup",
      });
    }
  };

const signUpConstructor =
  (dispatch) =>
  async ({
    firstname,
    lastname,
    username,
    email,
    password,
    confirmPassword,
    city,
    address,
    uploadedDocument,
  }) => {
    try {
      const formData = new FormData();
      formData.append("document", uploadedDocument);
      console.log(uploadedDocument);
      const response = await api.post("/signupConstructor", formData, {
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword,
        city,
        address,
        // uploadedDocument
      });

      console.log(
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword,
        city,
        address,
        uploadedDocument
      );

      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });

      navigate("Transaction");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with the signup",
      });
    }
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, clearErrorMessage, signUp, signUpConstructor },
  { token: null, errorMessage: "" }
);
