import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default axios.create({
  baseURL: "https://d1e0-2400-adc5-149-6200-e41d-ece4-d118-295a.ngrok-free.app",
});
