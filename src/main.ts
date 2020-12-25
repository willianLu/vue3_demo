import { createApp } from "vue";
import App from "./App.vue";
console.log(process.env, "------------------环境变量");
createApp(App).mount("#app");
