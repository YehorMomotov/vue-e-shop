<template>
  <div class="e-header-wrapper">
    <div class="e-header-wrapper__bg-img">
      <div class="e-header main-width">
        <router-link class="logo" :to="{ name: 'main' }">
          <img class="logo display" src="../../assets/logo.png" alt="" />
          <img
            class="logo small-logo"
            src="../../assets/small-logo.png"
            alt=""
        /></router-link>
        <eNavbarVue class="e-header__navbar display" />
        <div class="search-field-div">
          <input
            type="text"
            class="search-field"
            placeholder="Search..."
            v-model="searchValue"
          />
          <i
            @click="search(searchValue)"
            class="search-bar material-icons click-animation"
            >search</i
          >

          <i
            @click="clearSearchValue"
            class="search-bar material-icons click-animation"
            >cancel</i
          >
        </div>
        <div class="burger-menu" @click="closeSideMenu">
          <input id="menu__toggle" type="checkbox" v-model="sideMenu" />
          <label class="menu__btn" for="menu__toggle">
            <span></span>
          </label>
          <eNavbarVue class="menu__box" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eNavbarVue from "./e-navbar.vue";
import { mapActions } from "vuex";
export default {
  name: "e-header",
  components: { eNavbarVue },
  props: {},
  data() {
    return { searchValue: "", sideMenu: false };
  },
  methods: {
    ...mapActions(["SET_SEARCH_VALUE"]),
    closeSideMenu() {
      if (event.target.tagName !== "SPAN") {
        this.sideMenu = false;
      }
    },
    search(value) {
      this.SET_SEARCH_VALUE(value);
      if (this.$router.history.current.path !== "/products") {
        this.$router.push("/products");
      }
    },
    clearSearchValue() {
      this.searchValue = "";
      this.SET_SEARCH_VALUE(this.searchValue);
    },
  },
};
</script>

<style lang="scss">
.burger-menu {
  display: none;
  #menu__toggle {
    display: none;
  }
  #menu__toggle:checked ~ .menu__btn > span {
    transform: rotate(45deg);
  }
  #menu__toggle:checked ~ .menu__btn > span::before {
    top: 0;
    transform: rotate(0);
  }
  #menu__toggle:checked ~ .menu__btn > span::after {
    top: 0;
    transform: rotate(90deg);
  }
  #menu__toggle:checked ~ .menu__box {
    visibility: visible;
    left: 0;
  }
  .menu__btn {
    display: flex;
    align-items: center;
    width: 26px;
    height: 26px;
    cursor: pointer;
    z-index: 101;
  }
  .menu__btn > span,
  .menu__btn > span::before,
  .menu__btn > span::after {
    position: absolute;
    width: 26px;
    height: 2px;
    background-color: #616161;
    transition-duration: 0.25s;
  }
  .menu__btn > span::before {
    content: "";
    top: -8px;
    left: 0;
  }
  .menu__btn > span::after {
    content: "";
    top: 8px;
    left: 0;
  }
  .menu__box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    visibility: hidden;
    top: 0;
    left: -100%;
    width: 160px;
    height: 100%;
    margin: 0;
    list-style: none;
    background-color: $sandy_beach;
    box-shadow: 1px 0px 6px rgba(0, 0, 0, 0.2);
    transition-duration: 0.25s;
    a {
      padding: 36px;
    }
  }

  .menu__item:hover {
    background-color: #cfd8dc;
  }
}

.e-header-wrapper {
  z-index: 100;
  box-shadow: 0 0 8px black;
  position: fixed;
  width: 100%;
  background: $sandy-beach;
  top: 0;
  left: 0;
  &__bg-img {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: $padding * 4;
    background-image: url("@/assets/images/header-background.png");
  }
}
.e-header {
  background: $moccasin;
  box-shadow: 0 0 8px black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: $padding;
  &__navbar {
    flex-grow: 3;
    :hover {
      background: $sandy_beach;
    }
  }
  .small-logo {
    display: none;
  }
  .logo {
    padding: 0;
    margin: 0;
    height: 74px;
  }
  .search-field-div {
    display: flex;
    max-width: fit-content;
    align-items: center;
    background-color: white;
    margin-right: 20px;
    border-radius: 10px;
    padding-right: $padding;
  }
  .search-field {
    border-radius: 10px;
    border: none;
    padding: 10px;
    font-size: 1.4em;
    width: 20em;
    height: 1em;
  }
  .search-bar {
    border-radius: 10px;
    color: $cedar;
    margin-left: $margin/2;

    &:hover {
      background: $sandy_beach;
    }
  }
  @media only screen and (max-width: 1240px) {
    .search-field {
      width: 15em;
    }
  }
  @media only screen and (max-width: 1024px) {
    .search-field {
      width: 5em;
    }
  }
  @media only screen and (max-width: 768px) {
    justify-content: space-evenly;
    .small-logo {
      display: block;
    }
    .search-field {
      width: 7em;
    }

    .display {
      display: none;
    }
    .burger-menu {
      display: block;
    }
  }
  @media only screen and (max-width: 525px) {
    .search-field {
      width: 5em;
    }
  }
  @media only screen and (max-width: 375px) {
    .search-bar {
      margin: 0;
    }
    .search-field {
      padding-left: $padding;
      padding-right: $padding;
      width: 4em;
    }
  }
}
</style>
