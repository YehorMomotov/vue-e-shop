<template>
  <div class="e-product">
    <ePopupVue
      class="e-product__info"
      v-if="isInfoPopupVisible"
      :popupTitle="productData.name"
      @closePopup="closeInfoPopup"
      @addToCartAction="addToCart"
    >
      <img
        class="e-product__img"
        :src="require('@/assets/images/' + productData.image)"
        alt="img"
      />
      <div>
        <p class="e-product__name">{{ productData.name }}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat,
          quisquam quasi! Fugiat ratione id illum pariatur optio quia
          asperiores in! Cupiditate, ipsa alias optio est id molestiae.
          Neque, temporibus voluptas?
        </p>
        <p class="e-product__price">
          Price: {{ productData.price | formattedPrice }}
        </p>
      </div>
    </ePopupVue>
    <img
      class="e-product__img"
      :src="require('@/assets/images/' + productData.image)"
      alt="img"
    />
    <p class="e-product__name">{{ productData.name }}</p>
    <p class="e-product__price">
      Price: {{ productData.price | toFix | formattedPrice }}
    </p>
    <div class="e-product__btns">
      <button class="e-product__show-info" @click="showPopupInfo">
        Show info
      </button>
      <button class="e-product__add-btn" @click="addToCart">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
import ePopupVue from "../popup/e-popup.vue";
import toFix from "../../filters/toFix.js";
import formattedPrice from "../../filters/priceFormat.js";

export default {
  name: "e-product",
  components: { ePopupVue },
  props: {
    productData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return { isInfoPopupVisible: false };
  },
  computed: {},
  methods: {
    showPopupInfo() {
      this.isInfoPopupVisible = true;
    },
    closeInfoPopup() {
      this.isInfoPopupVisible = false;
    },
    addToCart() {
      this.$emit("addToCart", this.productData);
    },
  },
  filters: { toFix, formattedPrice },
};
</script>

<style lang="scss">
.e-product {
  flex-basis: 25%;
  box-shadow: 0 0 8px 0 grey;
  padding: $padding * 2;
  transition: 300ms ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-evenly;
  &__img {
    width: 400px;
    height: 300px;
    border-radius: 10px;
    box-shadow: 0 0 5px black;
  }
  &__name {
    font-size: 1.7em;
    font-weight: bold;
  }
  &__price,
  &__name {
    max-width: fit-content;
    margin: 10px;
    background: transparent !important;
  }
  &__price {
    font-size: 1.2em;
    text-align: right;
    padding-bottom: 4px;
  }
  &__show-info,
  &__add-btn {
    border-radius: 10px;
    font-size: 1.3em;
    border: none;
    padding: $padding;
  }
  &__show-info {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: $mandalay;
    padding-right: $padding/2;
  }
  &__add-btn {
    padding-left: $padding/2;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background: $green_bg;
  }

  &__btns {
    :hover {
      background: $hillary !important;
    }
  }
}
</style>
