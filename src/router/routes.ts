import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/Layout.vue");

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: Layout,
    redirect: { name: "dashboard" },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/index/main.vue"),
        meta: {
          title: "首页",
        },
      },
    ],
  },
];
