<template>
  <div class="e-cart-item">
    <img
      class="e-cart-item__img"
      :src="require('@/assets/images/' + cartItemData.image)"
      alt="img"
    />
    <div class="e-cart-item__info">
      <p class="e-cart-item__name">{{ cartItemData.name }}</p>
      <p class="e-cart-item__price">
        Price: {{ cartItemData.price | toFix | formattedPrice }}
      </p>
      <p class="e-cart-item__category">
        Category: {{ cartItemData.category }}
      </p>
    </div>
    <div class="e-cart-item__quantity">
      <p>Quantity:</p>
      <span class="quantity-btn" @click="decrement">-</span>
      {{ cartItemData.quantity }}
      <span class="quantity-btn" @click="increment">+</span>
    </div>
    <button @click="deleteFromCart">Delete</button>
  </div>
</template>

<script>
import toFix from "@/filters/toFix";
import formattedPrice from "../../filters/priceFormat.js";

export default {
  name: "e-cart-item",
  props: {
    cartItemData: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  mounted() {},
  methods: {
    deleteFromCart() {
      this.$emit("deleteFromCart");
    },
    decrement() {
      this.$emit("decrement");
    },
    increment() {
      this.$emit("increment");
    },
  },
  filters: { toFix, formattedPrice },
};
</script>

<style lang="scss">
.e-cart-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;
  margin: $margin * 2;
  &__img {
    max-width: 150px;
  }
}
.quantity-btn {
  cursor: pointer;
  user-select: none;
}
</style>
