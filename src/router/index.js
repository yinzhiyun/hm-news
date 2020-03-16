import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import User from "../pages/User.vue";
import EditUser from "../pages/EditUser.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login"
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
    }
  ]
});

export default router;
