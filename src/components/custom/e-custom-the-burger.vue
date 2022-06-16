<template>
  <div class="e-custom-the-burger">
    <div
      class="e-custom-the-burger__parts"
      :style="{ zIndex: (index - maxParts) * -1 }"
      v-for="(burgerPart, index) in currentBurgerParts"
      :key="index"
      @click="partActions(burgerPart)"
    >
      <div class="img-wrapper">
        <img
          :src="
            require('@/assets/images/burger-parts/' + burgerPart.image)
          "
          :alt="burgerPart.name"
          :title="burgerPart.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "e-custom-the-burger",
  props: {
    maxParts: {
      type: Number,
      default() {
        return 20;
      },
    },
    currentBurgerParts: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    partActions(burgerPart) {
      this.$emit("partActions", burgerPart);
    },
  },
};
</script>

<style lang="scss">
.e-custom-the-burger {
  overflow-y: auto;
  flex-basis: 48%;
  display: flex;
  flex-direction: column;
  max-height: 750px;
  &__parts {
    height: 100px;
    margin: 0 auto;
    .img-wrapper {
      width: 300px;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: -100 0;
      }
    }
  }
}
</style>
