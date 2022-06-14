<template>
  <div class="e-catalog">
    <h1>Categories catalog</h1>
    <h2>Choose needed category and order smth</h2>
    <div class="e-catalog__list">
      <div
        class="e-catalog-category"
        v-for="(category, index) in CATEGORIES"
        :key="index"
        @click="toProducts(category)"
      >
        <img
          class="e-catalog-category__img"
          :src="require('@/assets/images/categories/' + category.image)"
          alt="img"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "e-catalog",

  methods: {
    ...mapActions(["GET_CATEGORIES_FROM_API", "SET_SELECTED"]),
    toProducts(category) {
      this.SET_SELECTED(category.name).then(() => {
        this.$router.push("/products");
      });
    },
    setsel(category) {
      this.SET_SELECTED(category.name);
    },
  },

  computed: {
    ...mapGetters(["CATEGORIES"]),
  },
  mounted() {
    this.GET_CATEGORIES_FROM_API();
  },
};
</script>

<style lang="scss">
.e-catalog {
  &__list {
    margin: 0 auto;
    max-width: $img-size * 2;
    :hover {
      background: $sandy_beach;
    }
    box-shadow: 0 0 8px black;
    display: flex;
    flex-wrap: wrap;
  }
}
.e-catalog-category {
  transition: background 300ms ease;
  flex-basis: 50%;
  user-select: none;
  background: $moccasin;
  box-shadow: 0 0 4px black;
  &__img {
    user-select: none;
    padding: 50px;
    height: 200px;
    width: 200px;
  }
}
</style>
