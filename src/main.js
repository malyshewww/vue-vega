import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "../node_modules/nouislider/dist/nouislider.css";
import "./assets/style/libs/fancybox.css";
import "./assets/style/main.scss";

const app = createApp(App);
app.use(router);
app.mount("#app");
