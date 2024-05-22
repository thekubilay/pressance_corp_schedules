import Home from "@/views/Home.vue";
import Setting from "@/views/Setting.vue";
import Members from "@/views/Members.vue";
import AdminPanel from "@/views/AdminPanel.vue";
import Login from "@/views/Login.vue";

import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/panel",
    name: "AdminPanel",
    component: AdminPanel,
  },
  {
    path: "/panel/setting",
    name: "Setting",
    component: Setting,
  },
  {
    path: "/panel/members",
    name: "Members",
    component: Members,
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user_type = localStorage.getItem('user_type') || ""
  const authenticated = ["user", "admin"].includes(user_type)

  if (to.name === "Login" && authenticated) {
    next({name: "Home"})
    return;
  } else if (to.name !== "Login" && !authenticated) {
    next({name: "Login"})
    return;
  } else if (["Setting", "Members", "AdminPanel"].includes(to.name as string) && user_type !== "admin") {
    next({name: "Home"})
    return;
  }


  next()
});


export default router;