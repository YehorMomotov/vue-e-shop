<template>
  <div class="e-navbar">
    <router-link :to="{ name: 'catalog' }">Catalog</router-link>
    <router-link class="e-navbar__link-to-cart" :to="{ name: 'cart' }"
      >Cart</router-link
    >
    <router-link class="e-navbar__link-to-cart" :to="{ name: 'custom' }"
      >Custom</router-link
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "e-navbar",
  props: {},
  data() {
    return {};
  },
  computed: { ...mapGetters(["CART"]) },
};
</script>

<style lang="scss">
.e-navbar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-decoration: none;
  border-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  height: 52px;
  a {
    transition: background 300ms ease;
    border-radius: 10px;
    text-decoration: none;
    font-weight: bold;
    color: $cedar;
    font-size: 1.5em;
    padding: $padding;
    user-select: none;
    cursor: pointer;
  }
}
</style>
