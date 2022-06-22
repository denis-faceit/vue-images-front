import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import LoginLogic from "../logic/login";

import images from "./modules/images";
import forms from "./modules/forms";
import notifications from "./modules/notifications";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    headers: null,
  },
  mutations: {
    setHeaders(state, token) {
      state.headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      };
    },
    removeHeaders(state) {
      state.headers = null;
    },
  },
  actions: {
    doLogin({ commit }, user) {
      return new Promise((resolve, reject) => {
        LoginLogic.post(user)
          .then((response) => {
            commit("setHeaders", `Bearer ${response.auth_token}`);
            resolve({ path: "images_path" });
          })
          .catch((error) => reject(error));
      });
    },
    doLogOut({ commit }) {
      commit("removeHeaders");
    },
  },
  getters: {
    getHeaders(rootState) {
      return rootState.headers;
    },
  },
  modules: {
    images: images,
    forms: forms,
    notifications: notifications,
  },
  plugins: [
    createPersistedState({
      paths: ["headers"],
      storage: window.sessionStorage,
    }),
  ],
});

export default store;
