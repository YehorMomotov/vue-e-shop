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
  text-decoration: none;
  color: $cedar;
  &:active {
    filter: brightness(110%);
  }
  transition: 300ms background ease;
  &:hover {
    background: $hillary;
  }
}
.main-width {
  max-width: $body_width - 160px;
  min-width: $body_width - 160px;
}
@media only screen and (max-width: 1440px) {
  .main-width {
    max-width: $body_width - 460px;
    min-width: $body_width - 460px;
  }
}
@media only screen and (max-width: 1240px) {
  .main-width {
    max-width: $body_width - 560px;
    min-width: $body_width - 560px;
  }
}
@media only screen and (max-width: 1024px) {
  .main-width {
    max-width: $body_width - 760px;
    min-width: $body_width - 760px;
  }
}
@media only screen and (max-width: 768px) {
  .main-width {
    max-width: $body_width - 1060px;
    min-width: $body_width - 1060px;
  }
}
@media only screen and (max-width: 525px) {
  .main-width {
    max-width: $body_width - 1160px;
    min-width: $body_width - 1160px;
  }
}
@media only screen and (max-width: 375px) {
  .main-width {
    max-width: $body_width - 1230px;
    min-width: $body_width - 1230px;
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
// @media screen and (max-width: 320px) {
//   $body_width: 280px;
// }
</style>
