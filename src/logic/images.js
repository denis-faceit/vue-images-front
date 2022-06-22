import axios from "axios";

const petition = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default {
  fetchImages(params, headers) {
    return petition
      .get(`images?page=${params.page}`, { headers: headers })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
  search(params, headers) {
    return petition({
      method: "post",
      url: `images?page=${params.page}`,
      headers: headers,
      data: {
        search: params.search,
      },
    })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
  get(token, headers) {
    return petition
      .get(`images/${token}`, { headers: headers })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
  post(image, headers) {
    return petition
      .post(`upload`, image, { headers: headers })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
};
