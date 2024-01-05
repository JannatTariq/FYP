import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default axios.create({
  baseURL: "https://44bd-2400-adc5-149-6200-39e8-fcc3-73ec-83bb.ngrok-free.app",
});
