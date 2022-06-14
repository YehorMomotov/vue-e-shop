<template>
  <div class="e-cart">
    <h1>Cart</h1>

    <router-link class="e-catalog__link-to-cart" :to="{ name: 'catalog' }"
      >Back to catalog</router-link
    >
    <p v-if="!cartData.length">No items :(</p>
    <eCartItemVue
      v-else
      v-for="(item, index) in cartData"
      :key="item.article"
      :cartItemData="item"
      @deleteFromCart="deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <div class="e-cart__total">
      <p class="total-name">Total:</p>
      <p>{{ cartTotalCost | toFix | formattedPrice }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import eCartItemVue from "./e-cart-item.vue";
import toFix from "../../filters/toFix.js";
import formattedPrice from "../../filters/priceFormat.js";

export default {
  components: { eCartItemVue },
  name: "e-cart",

  data() {
    return { cartData: [] };
  },
  filters: { toFix, formattedPrice },
  computed: {
    ...mapGetters(["CART"]),
    cartTotalCost() {
      if (this.cartData.length) {
        let result = [];
        for (let item of this.cartData) {
          result.push(item.price * item.quantity);
        }
        result = result.reduce(function (sum, el) {
          return sum + el;
        });
        return result;
      } else return 0;
    },
  },
  methods: {
    ...mapActions([
      "DELETE_FROM_CART",
      "INCREMENT_QUANTITY",
      "DECREMENT_QUANTITY",
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },

    decrement(index) {
      this.DECREMENT_QUANTITY(index);
    },
    increment(index) {
      this.INCREMENT_QUANTITY(index);
    },
  },
  mounted() {
    this.cartData = this.CART;
  },
};
</script>

<style lang="scss">
.e-cart {
  &__total {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: $padding * 2;
    display: flex;
    z-index: 11;
    justify-content: center;
    background: $green_bg;
    color: #ffffff;
    font-size: 20px;
  }
  .total_name {
    margin-right: $margin * 2;
  }
}
</style>
