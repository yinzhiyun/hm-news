import Vue from "vue";
import VueRouter from "vue-router";
const Login = () => import("../pages/Login.vue");
const Register = () => import("../pages/Register.vue");
const User = () => import("../pages/User.vue");
const EditUser = () => import("../pages/EditUser.vue");
const Myconcern = () => import("../pages/Myconcern.vue");
const Mycomments = () => import("../pages/Mycomments.vue");
const Mycollection = () => import("../pages/Mycollection.vue");
const Home = () => import("../pages/Home.vue");
const Details = () => import("../pages/Details.vue");
const Search = () => import("../pages/Search.vue");
const Column = () => import("../pages/Column.vue");

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
      name: "home"
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
