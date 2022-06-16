<template>
  <div class="e-custom">
    <div class="e-custom__description">
      <h1>Custom</h1>
      <h1>
        Реализовать двусвязный список, с ним проще будет реализовать
        перемещение элементов вверх\вниз. Доделать main, сделать адаптив.
        После этих трех пунктов проект будет готов
      </h1>
      <h2>
        Here you can make burger by your own recipe. You only need to
        decide which ingredients to use.
        <h5>And don't forget about their order!</h5>
      </h2>
    </div>
    <div class="e-custom__burger-construction">
      <eCustomTheBurgerVue
        :currentBurgerParts="currentBurgerParts"
        @partActions="partActions"
        :maxParts="maxParts"
      />
      <eCustomSelectedItemVue
        :selectedItem="selectedItem"
        @optionSelected="optionSelected"
        @moveItem="moveItem"
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
    ...mapActions(["GET_BURGER_PARTS_FROM_API"]),
    partActions(part) {
      this.selectedItem = part;
    },
    addPart(part) {
      if (
        part.name === "top-bread-bun" ||
        part.name === "bottom-bread-bun"
      ) {
        part.available = false;
      }
      part.selectedOption = part.species[0];
      part.index = Number;
      this.selectedItem = part;
      this.parts.unshift(part);
      this.putInOrder();
    },
    optionSelected(option) {
      this.selectedItem.selectedOption = option;
    },
    putInOrder() {
      this.parts.forEach((part, index) => {
        if (part.name === "top-bread-bun" && index !== 0) {
          // const tmp = part;
          this.parts.slice(index, 1);
          console.log(this.parts);
          // this.parts.unshift(tmp);
        } else if (
          part.name === "bottom-bread-bun" &&
          index !== this.parts.length - 1
        ) {
          const tmp = part;
          this.parts.slice(index, 1);
          console.log(this.parts);
          this.parts.push(tmp);
        }
        this.parts[index].index = index;
      });
    },
    moveItem(direction, item) {
      if (direction === "up" && item.index !== 1) {
        const tmp = this.parts[item.index - 1];
        console.log(
          this.parts[item.index - 1].name,
          this.parts[item.index].name
        );
        this.parts[item.index - 1] = item;
        console.log(
          this.parts[item.index - 1].name,
          this.parts[item.index].name
        );
        this.parts[item.index] = tmp;
        console.log(
          this.parts[item.index - 1].name,
          this.parts[item.index].name
        );
      } else if (
        direction === "down" &&
        item.index !== this.parts.length - 2
      ) {
        const tmp = this.parts[item.index + 1];
        this.parts[item.index + 1] = item;
        this.parts[item.index] = tmp;
      }
      // this.putInOrder();
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
    justify-content: flex-end;
  }
}
</style>
