<template>
  <div class="e-ingredients-menu">
    <div
      class="e-ingredients-menu__item"
      v-for="(part, index) in itemsArray"
      :key="part.name"
      @click="addPart(part, index)"
    >
      <div
        :key="part.available"
        :class="{
          'e-ingredients-menu__item__wrapper': true,
          unavailable: !part.available,
        }"
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
import kebabToNormal from "../../filters/kebabToNormal.js";

export default {
  name: "e-ingredients-menu",
  data() {
    return {
      messages: [],
      itemsArray: [],
    };
  },
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
    ...mapActions(["SET_NOTIFICATIONS"]),
    addPart(part, index) {
      if (part.available) {
        if (
          part.name === "top-bread-bun" ||
          part.name === "bottom-bread-bun"
        ) {
          part.available = false;
          this.$emit("addPart", part);
        } else {
          this.$emit("addPart", JSON.parse(JSON.stringify(part)), index);
        }
      } else {
        this.SET_NOTIFICATIONS({
          name: "This item is unavailable now!",
          id: Date.now(),
          type: "error",
        });
      }
    },
  },
  watch: {
    burgerParts: {
      handler() {
        this.itemsArray = this.burgerParts;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.e-ingredients-menu {
  flex-basis: 25%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
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
    transition: background 300ms ease-in-out;
    background: $hillary;
    border-bottom: 1px solid black;
    cursor: pointer;
    user-select: none;
    .unavailable {
      filter: grayscale(100);
      cursor: auto;
    }
    &__wrapper {
      transition: background 300ms ease-in-out;
      flex-wrap: nowrap;
      padding-left: $padding * 2;
      align-items: center;
      display: flex;
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
  }
  :hover {
    background: $mandalay;
  }
  :active {
    filter: brightness(110%);
  }
  @media screen and (max-width: 768px) {
    min-width: 85px;
    &__item {
      &__wrapper {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 0;
        span {
          font-size: 0.7em;
          text-align: center;
        }
      }
    }
  }
}
</style>
