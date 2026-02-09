import axios from "axios";

export const initCsrf = async () => {
  await axios.get("https://api.cmmoin.academy/sanctum/csrf-cookie", {
    withCredentials: true,
  });
};
