<template>
  <div class="e-ingredients-menu">
    <div
      class="e-ingredients-menu__item"
      v-for="part in burgerParts"
      :key="part.name"
      @click="addPart(part)"
    >
      <img
        :src="require('@/assets/images/burger-parts/' + part.image)"
        :alt="part.name | kebabToNormal"
        :title="part.name | kebabToNormal"
      />
      <span
        >{{ part.name | kebabToNormal }}: <br />
        {{ part.price }} UAH<br />
      </span>
    </div>
  </div>
</template>

<script>
import kebabToNormal from "../../filters/kebabToNormal.js";
export default {
  name: "e-ingredients-menu",
  filters: { kebabToNormal },
  props: {
    burgerParts: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    addPart(part) {
      this.$emit("addPart", part);
    },
  },
};
</script>

<style lang="scss">
.e-ingredients-menu {
  border-radius: 20px;
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 750px;
  align-items: flex-end;

  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
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
  &__item {
    display: flex;
    background: $hillary;
    align-items: center;
    border-bottom: 1px solid black;
    max-width: fit-content;
    flex-wrap: nowrap;
    cursor: pointer;
    user-select: none;
    img {
      width: 50%;
    }
    span {
      width: 50%;
    }
    :hover {
      background: transparent !important;
    }
    :active {
      filter: brightness(100%) !important;
    }
  }
  :hover {
    background: $mandalay;
  }
  :active {
    filter: brightness(110%);
  }
}
</style>
