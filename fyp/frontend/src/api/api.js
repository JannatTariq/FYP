import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default axios.create({
  baseURL: "https://f981-2400-adc5-149-6200-4561-8a98-1460-fbc1.ngrok-free.app",
});
