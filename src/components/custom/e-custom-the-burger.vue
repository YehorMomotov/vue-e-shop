<template>
  <div
    class="e-custom-the-burger-wrapper"
    v-if="currentBurgerParts.length"
  >
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
  &__wrapper {
    flex-basis: 48%;
  }
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: $hillary;
  height: 750px - $padding * 4;
  border-radius: 20px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-radius: 10px;
  padding: $padding * 4;
  padding-bottom: 0;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: $hillary;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: $cedar;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: $mandalay;
  }
  &::-webkit-scrollbar-thumb:active {
    background: $sandy_beach;
  }

  &__parts {
    height: 100px;
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
