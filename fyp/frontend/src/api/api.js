import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default axios.create({
  baseURL: "https://9a73-116-58-41-157.ngrok-free.app",
});
