import ImagesLogic from "@/logic/images";

const images = {
  namespaced: true,
  state: {
    images: [],
    image: {},
    nextPage: 0,
    prevPage: 0,
  },
  mutations: {
    setImages(state, responseImages) {
      state.images = responseImages;
    },
    setImage(state, responseImage) {
      state.image = responseImage;
    },
    setNextPage(state, nextPage) {
      state.nextPage = nextPage;
    },
    setPrevPage(state, prevPage) {
      state.prevPage = prevPage;
    },
    clearImages(state) {
      state.images = [];
    },
    clearImage(state) {
      state.image = {};
    },
  },
  actions: {
    getImages({ dispatch, rootGetters }, params) {
      return new Promise((resolve, reject) => {
        ImagesLogic.fetchImages(params, rootGetters.getHeaders)
          .then((response) => {
            dispatch("setData", response);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    searchImages({ dispatch, rootGetters }, params) {
      return new Promise((resolve, reject) => {
        ImagesLogic.search(params, rootGetters.getHeaders)
          .then((response) => {
            dispatch("setData", response);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    setData({ commit }, response) {
      commit("setImages", response.images);
      commit("setNextPage", response.next_page_url);
      commit("setPrevPage", response.prev_page_url);
    },
    getImage({ commit, rootGetters }, token) {
      return new Promise((resolve, reject) => {
        ImagesLogic.get(token, rootGetters.getHeaders)
          .then((response) => {
            commit("setImage", response);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    postImage({ commit, rootGetters }, image) {
      return new Promise((resolve, reject) => {
        ImagesLogic.post(image, rootGetters.getHeaders)
          .then((response) => {
            commit("setImage", response);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    cleanImages({ commit }) {
      commit("clearImages");
    },
    cleanImage({ commit }) {
      commit("clearImage");
    },
  },
};

export default images;
