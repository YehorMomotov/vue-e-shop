<template>
  <div class="e-products">
    <eNotificationsVue
      @removeMessage="removeMessage"
      :messages="messages"
    />
    <h1>Catalog</h1>
    <div class="filters">
      <eSelectVue
        :selected="selected"
        :options="categories"
        @select="sortProducts"
      />
    </div>
    <div class="e-products__list">
      <eProduct
        v-for="product in filteredProducts"
        :key="product.article"
        :productData="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import eSelectVue from "../e-select.vue";
import eNotificationsVue from "../notifications/e-notifications.vue";
import eProduct from "./e-product.vue";

export default {
  name: "e-products",
  components: { eNotificationsVue, eProduct, eSelectVue },

  data() {
    return {
      categories: [
        { name: "All", value: "all" },
        { name: "Burger", value: "b" },
        { name: "Pizza", value: "p" },
        { name: "Sushi", value: "s" },
        { name: "Dessert", value: "d" },
      ],
      selected: this.$store.state.selected,
      sortedProducts: [],
      minPrice: 0,
      maxPrice: 1000,
      messages: [],
    };
  },
  computed: {
    ...mapGetters(["SEARCH_VALUE", "PRODUCTS", "CART", "SELECTED"]),
    filteredProducts() {
      if (this.sortedProducts) {
        return this.sortedProducts;
      } else {
        return this.PRODUCTS;
      }
    },
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART"]),
    addToCart(data) {
      this.ADD_TO_CART(data).then(() => {
        this.messages.unshift({
          name: data.article + " was added to cart",
          id: Date.now(),
        });
      });
    },
    removeMessage() {
      this.messages.splice(this.messages.length - 1, 1);
    },
    sortProducts(category) {
      if (category) {
        this.selected = category.name;
      }

      this.sortedProducts = [...this.PRODUCTS];
      this.sortedProducts = this.sortedProducts.filter((item) => {
        return item.price >= this.minPrice && item.price <= this.maxPrice;
      });

      if (this.selected !== "All" && this.selected) {
        this.sortedProducts = this.sortedProducts.filter((item) => {
          return item.category === this.selected;
        });
      }
    },
    setRangeSliders() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp;
      }
      this.sortProducts();
    },
    searchProduct(value) {
      if (value) {
        this.sortedProducts = this.PRODUCTS.filter((item) => {
          return item.name.toLowerCase().includes(value.toLowerCase());
        });
      } else {
        this.sortedProducts = this.PRODUCTS;
      }
    },
  },
  watch: {
    SEARCH_VALUE() {
      this.searchProduct(this.SEARCH_VALUE);
    },
    SELECTED() {
      this.selected = this.SELECTED;
      this.sortProducts();
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API().then((responce) => {
      if (responce.data) {
        this.sortProducts();
        this.searchProduct(this.SEARCH_VALUE);
      }
    });
  },
};
</script>

<style lang="scss">
.e-products {
  &__list {
    margin-top: 10px;
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    :hover {
      background: $sandy_beach;
    }
  }

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
