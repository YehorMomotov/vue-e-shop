<template>
  <div class="e-cart">
    <ePopupVue
      class="e-cart__confirm"
      v-if="isInfoPopupVisible"
      popupTitle="Confirming the order..."
      @closePopup="closeInfoPopup"
      @addToCartAction="sendOrder"
      LB="Close"
      RB="Confirm"
    >
      <div class="popup-content">
        <i class="material-icons big">shopping_cart</i>
        <h1>
          Your order will cost
          {{ cartTotalCost | toFix | formattedPrice }} UAH
        </h1>
        <div class="inputs-wrapper">
          <input
            type="text"
            placeholder="Enter your name..."
            v-model="orderData.userName.value"
          />
          <input
            type="tel"
            placeholder="(000) 000-00-00"
            v-mask="'(###) ###-##-##'"
            v-model="orderData.phoneNumber.value"
          />
          <div>
            <span class="cutlery">Cutlery:</span>&nbsp;
            <input
              type="number"
              min="1"
              max="20"
              onKeyDown="return false"
              v-model="orderData.cutlery.value"
            />
          </div>
          <div class="geo">
            <input
              type="text"
              placeholder="Enter your location..."
              v-model="orderData.location.value"
            />
          </div>
          <input
            type="text"
            placeholder="Additional info..."
            v-model="orderData.additional"
            masked="true"
          />
        </div>
      </div>
    </ePopupVue>
    <h1>Cart</h1>

    <router-link class="e-catalog__link-to-cart" :to="{ name: 'catalog' }"
      >Back to catalog</router-link
    >
    <p v-if="!orderData.cartData.length">No items :(</p>
    <eCartItemVue
      v-else
      v-for="(item, index) in orderData.cartData"
      :key="item.article"
      :cartItemData="item"
      @deleteFromCart="deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <div class="e-cart__total">
      <div class="e-cart__total__content">
        <p class="total-name">Total:&nbsp;</p>
        <p>{{ cartTotalCost | toFix | formattedPrice }}</p>
      </div>
      <button @click="confirmOrder" class="confirm-btn">
        Confirm order
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import eCartItemVue from "./e-cart-item.vue";
import toFix from "../../filters/toFix.js";
import formattedPrice from "../../filters/priceFormat.js";
import ePopupVue from "../popup/e-popup.vue";
import axios from "axios";
import { mask } from "vue-the-mask";
export default {
  components: {
    eCartItemVue,
    ePopupVue,
  },
  name: "e-cart",
  directives: { mask },
  data() {
    return {
      isInfoPopupVisible: false,
      orderData: {
        userName: { value: "", validation: false },
        phoneNumber: { value: "", validation: false },
        location: { value: "", validation: false },
        cutlery: { value: 1, validation: false },
        additional: "",
        cartData: [],
      },
    };
  },
  filters: { toFix, formattedPrice },
  computed: {
    ...mapGetters(["CART"]),
    cartTotalCost() {
      if (this.orderData.cartData.length) {
        let result = [];
        for (let item of this.orderData.cartData) {
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
    closeInfoPopup() {
      this.isInfoPopupVisible = false;
    },
    confirmOrder() {
      this.isInfoPopupVisible = true;
    },
    chechValidation() {
      if (
        this.orderData.phoneNumber.value.match(
          /^[(]?[0-9]{3}[)]?[ ]?[0-9]{3}[-]?[0-9]{2}[-]?[0-9]{2}$/im
        )
      ) {
        this.orderData.phoneNumber.validation = true;
      } else {
        this.orderData.phoneNumber.validation = false;
      }

      if (this.orderData.location.value) {
        this.orderData.location.validation = true;
      } else {
        this.orderData.location.validation = false;
      }

      if (this.orderData.cutlery.value <= 20) {
        this.orderData.cutlery.validation = true;
      } else {
        this.orderData.cutlery.validation = false;
      }
      if (this.orderData.userName.value) {
        this.orderData.userName.validation = true;
      } else {
        this.orderData.userName.validation = false;
      }
      return (
        this.orderData.cartData.length &&
        this.orderData.phoneNumber.validation &&
        this.orderData.location.validation &&
        this.orderData.cutlery.validation &&
        this.orderData.userName.validation
      );
    },
    sendOrder() {
      if (this.chechValidation()) {
        axios("http://localhost:3000/order", {
          method: "post",
          data: {
            totalCost: this.cartTotalCost,
            orderData: this.orderData,
          },
        })
          .then((request) => {
            console.log(request);
            return request;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
      }
    },
  },
  mounted() {
    this.orderData.cartData = this.CART;
  },
};
</script>

<style lang="scss">
.e-cart {
  .popup-content {
    width: 400px;
    .inputs-wrapper {
      display: flex;
      padding: $padding;
      flex-direction: column;
      align-items: center;
      background-color: $sandy_beach;
      border-radius: 10px;
      margin-bottom: $padding;
      .cutlery {
        font-size: 1.5em;
      }
      input {
        margin-top: $padding;
        margin-bottom: $padding;
        font-size: 1.5em;
        width: min-content;
        border-radius: 10px;
        border: none;
        padding: 10px;
      }
    }
  }
  &__confirm {
    .big {
      font-size: 10em;
      color: black;
    }
  }
  padding-bottom: 0;
  &__total {
    &__content {
      display: flex;
      justify-content: center;
    }
    border-radius: 10px;
    padding: $padding * 2;
    background: $green_bg;
    color: #ffffff;
    font-size: 20px;
    margin-top: 300px;
    .total_name {
      margin-right: $margin * 2;
    }
  }
}
.confirm-btn {
  background: $sandy_beach;
  border-radius: 10px;
  font-size: 1.3em;
  border: none;
  padding: $padding;
}
</style>
