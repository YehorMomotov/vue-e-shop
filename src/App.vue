<template>
  <div id="app">
    <eMainWrapperVue></eMainWrapperVue>
  </div>
</template>

<script>
import eMainWrapperVue from "./components/e-main-wrapper.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: { eMainWrapperVue },
  methods: {
    ...mapActions(["SET_MOBILE", "SET_DESKTOP"]),
  },
  computed: { ...mapGetters(["IS_MOBILE", "IS_DESKTOP"]) },
  mounted() {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 767) {
        this.SET_DESKTOP();
      } else {
        this.SET_MOBILE();
      }
    });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
button,
a {
  &:active {
    filter: brightness(110%);
  }
  transition: 300ms background ease;
  &:hover {
    background: $hillary;
  }
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $cedar;
}
.click-animation {
  cursor: pointer;
  transition: 300ms background ease;
  &:hover {
    background: $hillary;
  }
  &:active {
    filter: brightness(125%);
  }
}

.material-icons {
  user-select: none;
}

html {
  background: $sandy_beach_light;
}

body {
  margin: 0;
}
</style>
