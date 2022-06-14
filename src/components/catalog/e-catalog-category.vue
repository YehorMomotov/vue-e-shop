<template>
  <router-link
    :to="{ name: 'products', params: { selectData: category.name } }"
    class="e-catalog-category"
  >
    <img
      class="e-catalog-category__img"
      :src="require('@/assets/images/categories/' + category.image)"
      alt="img"
  /></router-link>
</template>

<script>
export default {
  name: "e-catalog-category",
  props: {
    category: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss"></style>
