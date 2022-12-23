import { createApp } from "vue";
import "./reset.css";
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from "./App.vue";
import { setupRouter } from "./router";

const app = createApp(App);
setupRouter(app);
app.use(ArcoVueIcon);
app.mount("#app");
