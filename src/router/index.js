import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Login from "../views/auth/Login";
import DashboardIndex from "../views/dashboard/Index";
import ImagesIndex from "../views/dashboard/children/images/Index";
import ImagesNew from "../views/dashboard/children/images/New";
import ImagesShow from "../views/dashboard/children/images/Show";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login_path",
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      component: DashboardIndex,
      meta: { requiresAuth: true },
      children: [
        { path: "/images", name: "images_path", component: ImagesIndex },
        { path: "/images/new", name: "new_image_path", component: ImagesNew },
        {
          path: "/images/:token",
          name: "show_image_path",
          component: ImagesShow,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.headers) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    if (store.state.headers) {
      next({ path: "/" });
    } else {
      next();
    }
  }
});

export default router;
