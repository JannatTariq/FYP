import createDataContext from "./createDataContext";
import api from "../api/api";
import { navigate } from "../navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  proposal: [],
  errorMessage: "",
};

const proposalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_error":
      return { errorMessage: " ", errorMessage: action.payload };
    case "upload_success":
      return { ...state, proposal: [...state.proposal, action.payload] };

    case "fetch_proposals":
      return action.payload;
    case "fetch_worker_proposals":
      return { ...state, proposal: action.payload };

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

const uploadProposal =
  (dispatch) =>
  async ({ image, address, area, price, bedroom, bathroom }) => {
    try {
      const authToken = await AsyncStorage.getItem("token");

      if (!image || !address || !area || !price || !bedroom || !bathroom) {
        dispatch({
          type: "add_error",
          payload: "Please provide all required information.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("profile", {
        uri: image,
        name: new Date().toISOString() + "_image",
        type: "image/*",
      });
      const cleanedArea = area.replace("sq.ft.", "").trim();
      const cleanedPrice = price.replace("Rs.", "").trim();
      formData.append("address", address);
      formData.append("area", cleanedArea);
      formData.append("price", cleanedPrice);
      formData.append("bedroom", bedroom);
      formData.append("bathroom", bathroom);
      // console.log(formData);

      const response = await api.post("/uploadProposal", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      dispatch({
        type: "upload_success",
        payload: response.data.proposal,
      });
      // console.log(response.data.proposal);
      navigate("HomeScreen", { data: response.data.proposal });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with the uploading proposal.",
      });
    }
  };

const fetchProposals = (dispatch) => async () => {
  try {
    const authToken = await AsyncStorage.getItem("token");

    // console.log(authToken);
    const response = await api.get("/getProposals", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    // console.log(response.data);

    dispatch({
      type: "fetch_proposals",
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with the fetching proposal.",
    });
  }
};

const fetchWorkerProposals = (dispatch) => async () => {
  try {
    const authToken = await AsyncStorage.getItem("token");
    const response = await api.get("/workerProposals", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    // console.log(response);

    dispatch({
      type: "fetch_worker_proposals",
      payload: response.data.proposals,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "add_error",
      payload: "An error occurred while fetching worker proposals.",
    });
  }
};

export const { Provider, Context } = createDataContext(
  proposalReducer,
  { uploadProposal, clearErrorMessage, fetchProposals, fetchWorkerProposals },
  []
);
