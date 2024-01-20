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
      return { ...state, errorMessage: action.payload };
    case "upload_success":
      if (action.payload) {
        return {
          ...state,
          proposal: [...(state.proposal ?? []), action.payload],
        };
      } else {
        console.error("Error: action.payload is undefined");
        return state;
      }
    case "fetch_proposals":
      return action.payload;
    case "fetch_worker_proposals":
      return { ...state, proposal: action.payload };
    case "accept_bid":
      return {
        ...state,
        proposal: state.proposal.map((proposal) =>
          proposal._id === action.payload.proposal._id
            ? action.payload.proposal
            : proposal
        ),
      };

    case "reject_bid":
      return {
        ...state,
      };
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

      const response = await api.post("/uploadProposal", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      // console.log(response.data.proposal.image);
      dispatch({
        type: "upload_success",
        payload: response.data.proposal,
      });
      navigate("HomeScreen");
    } catch (error) {
      console.error("Error uploading proposaljj:", error);
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
    // console.log(response.data);

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

const submitBid =
  (dispatch) =>
  async ({ proposalId, bidPrice }) => {
    try {
      // console.log(proposalId, bidPrice);
      const authToken = await AsyncStorage.getItem("token");
      const response = await api.post(
        "/submitBid",

        { proposalId, bidPrice },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      // console.log(response.data);

      // navigate("WorkerHomeScreen");
      dispatch({
        type: "fetch_proposals",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error submitting bid:", error);
      dispatch({
        type: "add_error",
        payload: "Error submitting bid.",
      });
    }
  };

const acceptBid =
  (dispatch) =>
  async ({ proposalId, bidId }) => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await api.post(
        "/acceptBid",
        { proposalId, bidId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      // console.log(response.data.proposal);

      const bids = response.data.proposal.bids;

      for (const bid of bids) {
        // console.log(bid.status);
        if (bid.status === "accepted") {
          // console.log("Deleting proposal:", bid._id);
          await api.delete(`/workerProposals/${proposalId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          // console.log("Proposal deleted successfully");
        }
      }

      dispatch({
        type: "accept_bid",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error accepting bid:", error);
      dispatch({
        type: "add_error",
        payload: "Error accepting bid.",
      });
    }
  };

const rejectBid =
  (dispatch) =>
  async ({ proposalId, bidId }) => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await api.post(
        "/rejectBid",
        { proposalId, bidId },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const bids = response.data.proposal.bids;

      // for (const bid of bids) {
      //   console.log(`Rejecting bid ${bid._id}`);
      // }
      // console.log(response.data);

      dispatch({
        type: "reject_bid",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error rejecting bid:", error);
      dispatch({
        type: "add_error",
        payload: "Error rejecting bid.",
      });
    }
  };

const proposalBids = (dispatch) => async () => {
  try {
    const authToken = await AsyncStorage.getItem("token");
    const response = await api.get("/proposalsWithBids", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    // console.log(response.data);

    dispatch({
      type: "fetch_worker_proposals",
      payload: response.data.proposalsWithBids,
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
  {
    uploadProposal,
    clearErrorMessage,
    fetchProposals,
    fetchWorkerProposals,
    submitBid,
    acceptBid,
    rejectBid,
    proposalBids,
  },
  []
);
