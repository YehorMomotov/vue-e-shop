<template>
  <div class="e-cart-item">
    <img
      class="e-cart-item__img"
      :src="require('@/assets/images/' + cartItemData.image)"
      alt="img"
    />
    <div class="e-cart-item__content">
      <div class="e-cart-item__info">
        <p class="e-cart-item__name">{{ cartItemData.name }}</p>
        <p class="e-cart-item__price">
          Price: {{ cartItemData.price | toFix | formattedPrice }}
        </p>
      </div>
      <div class="e-cart-item__quantity">
        <p>Quantity:</p>
        <div class="quantity-btns">
          <p class="quantity-btn click-animation" @click="decrement">-</p>
          {{ cartItemData.quantity }}
          <p class="quantity-btn click-animation" @click="increment">+</p>
        </div>
      </div>
      <button class="delete-btn" @click="deleteFromCart">Delete</button>
    </div>
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
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 8px 0 #b8b8b8;
  padding: $padding * 2;
  margin: $margin * 2;
  &__content {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    .quantity-btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .quantity-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        margin: 0;
        padding: 0;
        width: 20px;
        height: 20px;
        font-size: 1em;
        box-shadow: 0 0 8px 0 black;
      }
    }
    .delete-btn {
      border: none;
      margin: auto 0;
      padding: $padding;
      text-align: center;
      height: fit-content;
      width: fit-content;
      font-size: 1.2em;
      background: $green_bg;
      border-radius: 10px;
    }
  }
  &__img {
    max-width: 150px;
    border-radius: 10px;
    box-shadow: 0 0 5px black;
  }
  @media only screen and (max-width: 768px) {
    &__img {
      max-width: 100px;
      border-radius: 10px;
      box-shadow: 0 0 5px black;
    }
  }
  @media only screen and (max-width: 525px) {
    &__content {
      .quantity-btns {
        justify-content: space-evenly;
        .quantity-btn {
          font-size: 2em;
          width: 50px;
          height: 50px;
          border-radius: 50px;
        }
      }
      flex-direction: column;
      .delete-btn {
        margin: auto;
        margin-top: 10px;
      }
    }
  }
}
@media only screen and (max-width: 525px) {
  .e-cart-item {
    flex-direction: column;
  }
}
</style>
