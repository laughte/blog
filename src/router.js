import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "home",
      meta: {
        keepAlive: true
      },
      component: Home
    },
    // 动态路由匹配
    {
      path: "/user",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/user/:username",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/article",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/article/:articletype",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: {
        keepAlive: true
      },
      component: () => import("./views/login.vue")
    },
    {
      path: "/signin",
      name: "signin",
      meta: {
        keepAlive: true
      },
      component: () => import("./views/signin.vue")
    },
    {
      path: "/blackboard",
      name: "blackboard",
      component: () => import("./views/writeboard.vue")
    },

    {
      path: "/manage",
      name: "manage",
      meta: {
        keepAlive: true
      },
      component: () => import("./views/manage.vue")
    },
    {
      path: "/picture",
      name: "picture",
      meta: {
        keepAlive: true
      },
      component: () => import("./views/picture.vue")
    },
    {
      path: "/articlepage/:id",
      name: "articlepage",
      meta: {
        keepAlive: true
      },
      component: () => import("./views/articlepage.vue")
    }
  ],
  scrollBehavior(to, form, savedPosition) {
    //scrollBehavior方法接收to，form路由对象
    //第三个参数savedPosition当且仅当在浏览器前进后退按钮触发时才可用
    //该方法会返回滚动位置的对象信息，如果返回false，或者是一个空的对象，那么不会发生滚动
    //我们可以在该方法中设置返回值来指定页面的滚动位置，例如：
    return {
      x: 0,
      y: 0
    };
    //表示在用户切换路由时让是所有页面都返回到顶部位置
    //如果返回savedPosition,那么在点击后退按钮时就会表现的像原生浏览器一样，返回的页面会滚动过到之前按钮点击跳转的位置，大概写法如下：
    //  if(savedPosition){
    //     return savedPosition
    //  }else{
    //    return {x:0,y:0}
    //  }
    //如果想要模拟滚动到锚点的行为:
    // if (to.hash) {
    //   return {
    //     selector: to.hash
    //   }
    // }
  }
});
