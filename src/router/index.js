import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from "@/utils/auth";

export const aboutRouter = {
  path: "/about",
  name: "about",
  component: () => import("@/views/about/index.vue"),
  meta: {},
  children: [],
};

// 404路由
export const notFoundRouter = {
  path: "/:pathMatch(.*)*",
  name: "notFound",
  component: () => import("@/views/error/NotFound.vue"),
  meta: {},
  children: [],
};

// 组合路由信息
const modules = import.meta.glob("./modules/**/*.js", { eager: true });
const routes = [];
Object.keys(modules).forEach((key) => {
  const module = modules[key].default;
  routes.push(module);
});
routes.push(aboutRouter,notFoundRouter);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const noStatusPage = ['/login', '/about','/contact','/register']

router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem("userInfo");
  const userIsLogin = token ? true : false;
  if (userIsLogin || noStatusPage.includes(to.path)) {
      next();
  } else {
    next('/login')
  }
});

router.afterEach(() => {
});

export default router;
