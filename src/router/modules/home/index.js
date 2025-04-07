import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";

export default {
  path: "/",
  name: "Home",
  component: () => import("@/layout/index.vue"),
  meta: {
    role: ["common", "admin"],
    parentRouter: "Home",
  },
  children: [
    {
      path: "/",
      name: "HomePage",
      component: () => import("@/views/home/index.vue"),
      meta: {
        title: "默认首页",
        isShow: true,
      }
    },
    {
      path: "/p",
      name: "ParentPage",
      meta: {
        isShow: true,
        title: "父菜单",
      },
      children: [
        {
          path: "/p/child1",
          name: "Child1Page1",
          meta: {
            isShow: true,
            title: "子菜单1",
          },
        },
        {
          path: "/p/child2",
          name: "Child1Page2",
          meta: {
            isShow: true,
            title: "子菜单2",
          },
        },
        {
          path: "/p/child3",
          name: "Child1Page3",
          meta: {
            isShow: true,
            title: "子菜单3",
          },
        },
        {
          path: "/p/child4",
          name: "Child1Page4",
          meta: {
            isShow: true,
            title: "子菜单4",
          },
        },
      ],
    },
    {
      path: "/project",
      name: "projectPage",
      component: () => import("@/views/project/index.vue"),
      meta: {
        title: "项目模块",
        isShow: true,
        parentRouter: "Home",
      },
    },
    {
      path: "/user",
      name: "UserPage",
      component: () => import("@/views/user/index.vue"),
      meta: {
        title: "用户模块",
        isShow: true,
      },
      children: [],
    },
    {
      path: "/role",
      name: "RolePage",
      component: () => import("@/views/role/index.vue"),
      meta: {
        title: "角色模块",
        isShow: true,
      }
    },
    {
      path: "/auth",
      name: "AuthPage",
      component: () => import("@/views/auth/index.vue"),
      meta: {
        title: "权限模块",
        isShow: true,
      },
    },
  ],
};
