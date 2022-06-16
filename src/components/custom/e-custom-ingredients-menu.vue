<template>
  <div class="e-ingredients-menu">
    <eNotificationsVue
      @removeMessage="removeMessage"
      :messages="messages"
    />
    <div
      class="e-ingredients-menu__item"
      v-for="part in burgerParts"
      :key="part.name"
      @click="addPart(part)"
    >
      <div
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
import kebabToNormal from "../../filters/kebabToNormal.js";

import eNotificationsVue from "../notifications/e-notifications.vue";
export default {
  name: "e-ingredients-menu",
  data() {
    return {
      messages: [],
    };
  },
  components: { eNotificationsVue },
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
      if (part.available) {
        part.name === "top-bread-bun" || part.name === "bottom-bread-bun"
          ? this.$emit("addPart", part)
          : this.$emit("addPart", JSON.parse(JSON.stringify(part)));
      } else {
        this.messages.unshift({
          name: "This item is unavailable now!",
          id: Date.now(),
        });
      }
    },
    removeMessage() {
      this.messages.splice(this.messages.length - 1, 1);
    },
  },
};
</script>

<style lang="scss">
.e-ingredients-menu {
  border-radius: 20px;
  flex-basis: 25%;
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
    transition: 300ms ease-in-out;
    background: $hillary;
    border-bottom: 1px solid black;
    cursor: pointer;
    user-select: none;
    .unavailable {
      filter: grayscale(100);
      cursor: auto;
    }
    &__wrapper {
      transition: 300ms ease-in-out;
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
}
</style>
