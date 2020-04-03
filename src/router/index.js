import Vue from "vue";
import VueRouter from "vue-router";
const Login = () =>
  import(/* webpackChunkName: "users" */ "../pages/Login.vue");
const Register = () =>
  import(/* webpackChunkName: "users" */ "../pages/Register.vue");
const User = () => import(/* webpackChunkName: "users" */ "../pages/User.vue");
const EditUser = () =>
  import(/* webpackChunkName: "users" */ "../pages/EditUser.vue");
const Myconcern = () =>
  import(/* webpackChunkName: "users" */ "../pages/Myconcern.vue");
const Mycomments = () =>
  import(/* webpackChunkName: "users" */ "../pages/Mycomments.vue");
const Mycollection = () =>
  import(/* webpackChunkName: "users" */ "../pages/Mycollection.vue");
const Home = () => import(/* webpackChunkName: "home" */ "../pages/Home.vue");
const Details = () =>
  import(/* webpackChunkName: "home" */ "../pages/Details.vue");
const Search = () =>
  import(/* webpackChunkName: "home" */ "../pages/Search.vue");
const Column = () =>
  import(/* webpackChunkName: "home" */ "../pages/Column.vue");

//导入store
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/login",
      component: Login,
      name: "login"
    },
    {
      path: "/register",
      component: Register,
      name: "register"
    },
    {
      path: "/user",
      component: User,
      name: "user"
    },
    {
      path: "/editUser",
      component: EditUser,
      name: "editUser"
    },
    {
      path: "/Myconcern",
      component: Myconcern,
      name: "myConcern"
    },
    {
      path: "/Mycomments",
      component: Mycomments,
      name: "myComments"
    },
    {
      path: "/Mycollection",
      component: Mycollection,
      name: "myCollection"
    },
    {
      path: "/Details/:id",
      component: Details,
      name: "details"
    },
    {
      path: "/Search",
      component: Search,
      name: "search"
    },
    {
      path: "/Column",
      component: Column,
      name: "column"
    }
  ]
});
//配置路由守卫
router.beforeEach((to, from, next) => {
  if (to.name === "home") {
    store.commit("catch", "home");
  }
  console.log("当前跳转的页面:" + from.name + "要跳转的页面:" + to.name);
  if (from.name === "home" && to.name !== "details") {
    store.commit("uncatch", "home");
  }
  const token = localStorage.getItem("token");
  const pachUrl = [
    "/user",
    "/editUser",
    "/Myconcern",
    "/Mycomment",
    "/Mycollection"
  ];
  if (pachUrl.includes(to.path)) {
    if (token) {
      next();
    } else {
      router.push("/login");
    }
  } else {
    next();
  }
});

export default router;
