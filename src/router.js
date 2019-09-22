import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
import Home from "./views/Home.vue";

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      meta: {
        keepAlive: true
      },
      component: () =>
        import(
          /* webpackChunkName: "about" */
          "./views/login.vue"
        ) /* 懒加载 ???? */
    },
    {
      path: "/signin",
      name: "signin",
      meta: {
        keepAlive: true
      },
      component: () =>
        import(
          /* webpackChunkName: "about" */
          "./views/signin.vue"
        ) /* 懒加载 ???? */
    },
    {
      path: "/blackboard",
      name: "blackboard",
      component: () =>
        import(
          /* webpackChunkName: "about" */
          "./views/writeboard.vue"
        ) /* 懒加载 ???? */
    },

    {
      path: "/manage",
      name: "manage",
      meta: {
        keepAlive: true
      },
      component: () =>
        import(
          /* webpackChunkName: "about" */
          "./views/manage.vue"
        ) /* 懒加载 ???? */
    },
    {
      path: "/picture",
      name: "picture",
      meta: {
        keepAlive: true
      },
      component: () =>
        import(
          /* webpackChunkName: "about" */
          "./views/picture.vue"
        ) /* 懒加载 ???? */
    },
    {
      path: "/articlepage",
      name: "articlepage",
      meta: {
        keepAlive: true
      },
      component: () => import("./views/articlepage.vue")
    }
  ]
});
