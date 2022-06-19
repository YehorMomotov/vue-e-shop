<template>
  <div class="e-custom">
    <div class="e-custom__description">
      <h1>Custom</h1>
      <h2>
        Here you can make burger by your own recipe. You only need to
        decide which ingredients to use.
        <h5>And don't forget about their order!</h5>
      </h2>
    </div>
    <span class="e-custom__btns-wrapper">
      <button class="add-btn" @click="addToCart">
        Add my burger! <i class="material-icons">add_shopping_cart</i>
      </button>
      <button class="clear-btn" @click="clear">
        Clear constructor <i class="material-icons">clear</i>
      </button>
    </span>
    <div class="e-custom__burger-construction">
      <eCustomTheBurgerVue
        :currentBurgerParts="currentBurgerParts"
        @partActions="partActions"
        :maxParts="maxParts"
      />
      <eCustomSelectedItemVue
        :selectedItem="selectedItem"
        @optionSelected="optionSelected"
        @itemAction="putInOrder"
        @apllyToAll="apllyToAll"
      />
      <eCustomIngredientsMenuVue
        :burgerParts="itemsArray"
        @addPart="addPart"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import eCustomIngredientsMenuVue from "./e-custom-ingredients-menu.vue";
import eCustomSelectedItemVue from "./e-custom-selected-item.vue";
import eCustomTheBurgerVue from "./e-custom-the-burger.vue";

export default {
  components: {
    eCustomIngredientsMenuVue,
    eCustomTheBurgerVue,
    eCustomSelectedItemVue,
  },
  name: "e-custom",
  data() {
    return {
      maxParts: 20,
      parts: [],
      selectedItem: { name: "none" },
    };
  },

  computed: {
    ...mapGetters(["BURGER_PARTS"]),
    currentBurgerParts() {
      return this.parts;
    },
    itemsArray() {
      return JSON.parse(JSON.stringify(this.BURGER_PARTS));
    },
  },

  methods: {
    ...mapActions([
      "GET_BURGER_PARTS_FROM_API",
      "ADD_TO_CART",
      "SET_NOTIFICATIONS",
    ]),

    addToCart() {
      if (this.parts.length === 0) {
        this.SET_NOTIFICATIONS({
          name: "There is no ingredients in your burger!",
          id: Date.now(),
          type: "error",
        });
      } else {
        const condition =
          this.parts.filter((item) => {
            return (
              item.name === "top-bread-bun" ||
              item.name === "bottom-bread-bun"
            );
          }).length > 1;
        if (condition) {
          const product = {
            price: 0,
            image: "custom.png",
            name: "Custom burger",
            article: "BC" + Date.now().toString(),
            available: true,
            category: "Burger",
            quantity: 1,
            contains: this.parts.map((item) => {
              const tmp = JSON.parse(JSON.stringify(item));
              delete tmp.id;
              delete tmp.appliedToAll;
              return tmp;
            }),
          };
          this.parts.forEach((part) => {
            product.price += part.price;
          });
          this.ADD_TO_CART(product);
          this.SET_NOTIFICATIONS({
            name: "Your burger added to cart!",
            id: Date.now(),
            type: "succeed",
          });
        } else {
          this.SET_NOTIFICATIONS({
            name: "You forgot to add top and/or bottom buns, be careful next time!",
            id: Date.now(),
            type: "warning",
          });
        }
      }
    },

    partActions(part) {
      this.selectedItem = part;
    },

    clear() {
      this.parts = [];
      this.selectedItem = { name: "none" };
      this.GET_BURGER_PARTS_FROM_API();
    },

    addPart(part) {
      part.selectedOption = part.species[0];
      part.id = Date.now();
      part.appliedToAll = false;
      this.selectedItem = part;
      this.parts.unshift(part);
      this.putInOrder();
    },

    optionSelected(option) {
      this.$set(this.selectedItem, "selectedOption", option);
      if (this.selectedItem.appliedToAll) {
        this.apllyToAll(
          option,
          this.selectedItem,
          this.selectedItem.appliedToAll
        );
      }
    },

    swapItems(firstIndex, secondIndex, part) {
      const tmp = this.parts[firstIndex];
      this.$set(this.parts, secondIndex, tmp);
      this.$set(this.parts, firstIndex, part);
    },

    putInOrder(action, item) {
      this.parts.forEach((part, index) => {
        if (part.name === "top-bread-bun" && index !== 0) {
          this.swapItems(0, 1, part);
        } else if (
          part.name === "bottom-bread-bun" &&
          index !== this.parts.length - 1
        ) {
          this.swapItems(this.parts.length - 1, index, part);
        }
        if (
          action === "up" &&
          item.id === part.id &&
          index > 1 &&
          index < this.parts.length - 1
        ) {
          this.swapItems(index - 1, index, part);
          action = "";
        } else if (
          action === "down" &&
          item.id === part.id &&
          index < this.parts.length - 2 &&
          index
        ) {
          this.swapItems(index + 1, index, part);
          action = "";
        } else if (action === "remove" && item.id === part.id) {
          console.log(index);
          action = "";
          part.available = true;
          this.parts.splice(index, 1);
          this.parts[index]
            ? (this.selectedItem = this.parts[index])
            : this.parts[index + 1]
            ? (this.selectedItem = this.parts[index + 1])
            : this.parts[index - 1]
            ? (this.selectedItem = this.parts[index - 1])
            : (this.selectedItem = { name: "none" });
        }
      });
    },

    apllyToAll(option, part, isChecked) {
      this.parts.forEach((item) => {
        if (
          item.name.includes("bread-bun") &&
          part.name.includes("bread-bun")
        ) {
          isChecked
            ? ((item.selectedOption = option), (item.appliedToAll = true))
            : part.name === item.name
            ? (item.appliedToAll = false)
            : ((item.selectedOption = item.species[0]),
              (item.appliedToAll = false));
        } else if (part.name === item.name && part.id !== item.id) {
          console.log(item, isChecked);
          isChecked
            ? ((item.selectedOption = option), (item.appliedToAll = true))
            : (item.selectedOption = item.species[0]),
            (item.appliedToAll = false);
        }
      });
    },
  },
  mounted() {
    this.GET_BURGER_PARTS_FROM_API();
  },
};
</script>

<style lang="scss" scoped>
.e-custom {
  &__description {
    margin: 0;
  }
  &__burger-construction {
    display: flex;
    justify-content: center;
  }
  &__btns-wrapper {
    display: flex;
    margin-bottom: $margin * 2;
    max-height: fit-content;
    justify-content: center;
    align-items: center;
    .add-btn,
    .clear-btn {
      transition: background 300ms ease-in-out;
      border-radius: 10px;
      border: none;
      padding: $padding;
      font-size: 1.7em;
      width: 20%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .material-icons {
        background: transparent !important;
      }
    }
    .add-btn {
      background: $green_bg;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .clear-btn {
      border-top-left-radius: 0;
      background: $mandalay;
      border-bottom-left-radius: 0;
    }
    :hover {
      background: $sandy_beach !important;
    }
  }
}
</style>
