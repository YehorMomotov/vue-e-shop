<template>
  <div class="e-products">
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
import eProduct from "./e-product.vue";

export default {
  name: "e-products",
  components: { eProduct, eSelectVue },

  data() {
    return {
      categories: ["All", "Burger", "Pizza", "Sushi", "Dessert"],
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
    ...mapActions([
      "GET_PRODUCTS_FROM_API",
      "ADD_TO_CART",
      "SET_NOTIFICATIONS",
      "SET_SELECTED",
    ]),

    addToCart(data) {
      this.ADD_TO_CART(data).then(() => {
        this.SET_NOTIFICATIONS({
          name: data.name + " was added to cart",
          id: Date.now(),
          type: "succeed",
        });
      });
    },

    sortProducts(category) {
      if (category) {
        this.SET_SELECTED(category);
      }

      this.sortedProducts = [...this.PRODUCTS];
      this.sortedProducts = this.sortedProducts.filter((item) => {
        return item.price >= this.minPrice && item.price <= this.maxPrice;
      });

      if (this.selected !== "All" && this.selected) {
        this.sortedProducts = this.sortedProducts.filter((item) => {
          return (
            item.category.toLowerCase() === this.selected.toLowerCase()
          );
        });
      }
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
        this.searchProduct(this.SEARCH_VALUE);
        this.sortProducts();
      }
    });
  },
};
</script>

<style lang="scss">
.e-products {
  &__list {
    margin: 10px;
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
  }
  @media screen and (max-width: 1440px) {
    &__list {
      margin: 70px;
      margin-top: 10px;
    }
    .filters {
      margin-left: 70px;
    }
  }
  @media screen and (max-width: 1240px) {
    &__list {
      margin: 30px;
      margin-top: 10px;
    }
    .filters {
      margin: 30px;
    }
  }
  @media screen and (max-width: 1024px) {
    &__list {
      margin: 0;
      margin-top: 10px;
      justify-content: space-evenly;
    }
    .filters {
      margin: 0;
      justify-content: space-evenly;
    }
  }
}
</style>
