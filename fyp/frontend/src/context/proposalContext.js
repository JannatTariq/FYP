import createDataContext from "./createDataContext";
import api from "../api/api";
import { navigate } from "../navigationRef";

const proposalReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { errorMessage: " ", errorMessage: action.payload };
    case "upload_success":
      return { errorMessage: "", proposal: action.payload };
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
      console.log(image, address, area, price, bedroom, bathroom);
      const response = await api.post("/uploadProposal", {
        image,
        address,
        area,
        price,
        bedroom,
        bathroom,
      });
      dispatch({
        type: "upload_success",
        payload: response.data.proposal,
      });

      navigate("Bidding", { data: response.data.proposal });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with the uploading proposal.",
      });
    }
  };

export const { Provider, Context } = createDataContext(
  proposalReducer,
  { uploadProposal, clearErrorMessage },
  {
    errorMessage: "",
  }
);
