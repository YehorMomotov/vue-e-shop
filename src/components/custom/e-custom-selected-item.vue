<template>
  <div class="e-selected-item" v-if="selectedItem.name !== 'none'">
    <h2>
      {{ selectedItem.name | kebabToNormal }}
    </h2>
    <div class="btns">
      <button @click="moveItem('up')">Move Up</button
      ><button @click="moveItem('down')">Move Down</button>
    </div>
    <div class="e-selected-item__options">
      <img
        :src="
          require('@/assets/images/burger-parts/' + selectedItem.image)
        "
        :title="selectedItem.name | kebabToNormal"
        :alt="selectedItem.name | kebabToNormal"
      />
      <eSelectVue
        :selected="selected"
        :options="selectedItem.species"
        @select="selectSpecies"
      />
    </div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
      dolores id dolorum earum consectetur quo itaque quos amet atque
      deserunt, adipisci, libero deleniti. Iste at repudiandae nisi dolorum
      consectetur esse?
    </p>
  </div>
</template>

<script>
import kebabToNormal from "../../filters/kebabToNormal.js";
import eSelectVue from "../e-select.vue";

export default {
  name: "e-custom-selected-item",
  components: { eSelectVue },
  filters: { kebabToNormal },
  data() {
    return {
      selected: "Choose an option...",
    };
  },
  props: {
    selectedItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    selectSpecies(option) {
      this.selected = option;
      this.$emit("optionSelected", option);
    },
    moveItem(direction) {
      this.$emit("moveItem", direction, this.selectedItem);
    },
  },
};
</script>
<style lang="scss" scoped>
.e-selected-item {
  padding: $padding;
  flex-basis: 25%;
  &__options {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  img {
    width: 100px;
  }
}
</style>
