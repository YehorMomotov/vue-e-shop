<template>
  <div class="e-header-wrapper">
    <div class="e-header-wrapper__bg-img">
      <div class="e-header">
        <router-link class="logo" :to="{ name: 'main' }">
          <img class="logo" src="../../assets/logo.png" alt=""
        /></router-link>
        <eNavbarVue class="e-header__navbar" />
        <div class="search-field-div">
          <input
            type="text"
            class="search-field"
            placeholder="Search..."
            v-model="searchValue"
          />
          <button class="search-btn" @click="search(searchValue)">
            <i class="material-icons">search</i>
          </button>
          <button class="search-btn" @click="clearSearchValue">
            <i class="material-icons">cancel</i>
          </button>
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
    return { searchValue: "" };
  },
  methods: {
    ...mapActions(["SET_SEARCH_VALUE"]),
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
  width: $body_width;

  &__navbar {
    flex-grow: 3;
    :hover {
      background: $sandy_beach;
    }
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
    color: white;
    margin-right: 20px;
    border-radius: 10px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  .search-field {
    border-radius: 10px;
    border: none;
    padding: 10px;
    font-size: 1.4em;
    width: 20em;
    height: 1em;
  }
  .search-btn {
    background: transparent;
    border: none;
    :hover {
      background: $sandy_beach;
      border-radius: 10px;
    }
  }
}
</style>
