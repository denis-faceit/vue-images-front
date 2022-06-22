import axios from "axios";

const petition = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default {
  post(user) {
    return petition
      .post("authenticate", user)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
};
