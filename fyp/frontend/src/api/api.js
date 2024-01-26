import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export default axios.create({
//   baseURL: "https://0a6e-2400-adc5-149-6200-f18e-23d1-f243-d89b.ngrok-free.app",
// });

const instance = axios.create({
  baseURL: "https://222d-2400-adc5-149-6200-a540-eba1-e04b-d7fc.ngrok-free.app",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
