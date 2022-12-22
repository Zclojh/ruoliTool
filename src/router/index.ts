import { createRouter, createWebHistory } from "vue-router";
import { App } from "vue";
import { routes } from "./routes";
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    window.document.title = (to.meta.title as string) + " - " + "若离工具箱";
  }
  next();
});

export default router;

export function setupRouter(app: App) {
  app.use(router);
}
