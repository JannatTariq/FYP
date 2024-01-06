import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default axios.create({
  baseURL: "https://192a-2400-adc5-149-6200-14b2-8cf-dc04-834.ngrok-free.app",
});
