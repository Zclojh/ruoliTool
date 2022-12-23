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
      {
        path: "encdec",
        name: "encdec",
        meta: {
          title: "加解密",
        },
        redirect: {name: 'encdecAES'},
        children: [
          {
            path: "encdecAES",
            name: "encdecAES",
            component: () => import("@/views/encdec/aes.vue"),
            meta: {
              title: "AES",
            },
          },
        ]
      },
    ],
  },
];
