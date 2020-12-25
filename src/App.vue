<template>
  <div>
    <button @click="ckey = 'home'">首页</button>
    <button @click="ckey = 'other'">其他</button>
  </div>
  <!-- <Home v-if="isShow" /> -->
  <component :is="ckey"></component>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Home from "./views/index.vue";
import Other from "./views/other.vue";

@Options({
  components: {
    Home,
    Other
  },
  data() {
    return {
      isShow: true,
      ckey: "home"
    };
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
