<template>
  <div class="e-selected-item" v-if="selectedItem.name !== 'none'">
    <h2>
      {{ selectedItem.name | kebabToNormal }}
      <br />#{{ selectedItem.id }}
    </h2>
    <div class="btns">
      <div class="move-btns">
        <button class="move-btns__up" @click="itemAction('up')">
          Move Up <i class="material-icons">arrow_upward</i></button
        ><button class="move-btns__down" @click="itemAction('down')">
          Move Down <i class="material-icons"> arrow_downward</i>
        </button>
      </div>
      <button class="remove-btn" @click="itemAction('remove')">
        Remove<i class="material-icons">clear</i>
      </button>
    </div>
    <div class="e-selected-item__options">
      <img
        :src="
          require('@/assets/images/burger-parts/' + selectedItem.image)
        "
        :title="selectedItem.name | kebabToNormal"
        :alt="selectedItem.name | kebabToNormal"
      />
      <div v-if="selectedItem.species.length > 1">
        <eSelectVue
          :selected="selectedItem.selectedOption"
          :options="selectedItem.species"
          @select="selectSpecies"
        />
        <input
          @change="apllyToAll(selectedItem.selectedOption)"
          type="checkbox"
          name="none"
          :checked="selectedItem.appliedToAll"
        />
        <span>Apply on similar ingredients?</span>
      </div>
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
  props: {
    selectedItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    apllyToAll(option) {
      this.$emit(
        "apllyToAll",
        option,
        this.selectedItem,
        event.target.checked
      );
    },
    selectSpecies(option) {
      this.$emit("optionSelected", option);
    },
    itemAction(action) {
      this.$emit("itemAction", action, this.selectedItem);
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
  &__options {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      padding-right: 10px;
      width: 100px;
    }
  }
  .btns {
    transition: background 300ms ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    :hover {
      background: $sandy_beach !important;
    }
    .material-icons {
      font-size: 1em;
      background: transparent !important;
    }
    .move-btns {
      background: transparent !important;
      transition: background 300ms ease-in-out;
      width: max-content;
      width: 100%;
      display: flex;
      &__up,
      &__down {
        width: 100%;
        font-size: 1.2em;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $green_bg;
        transition: background 300ms ease-in-out;
      }
      &__up {
        border-radius: 10px;
        border: none;
        padding: $padding/2;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
      }
      &__down {
        border-radius: 10px;
        border: none;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;
        padding: $padding/2;
      }
    }
    .remove-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 300ms ease-in-out;
      width: 100%;
      font-size: 1.2em;
      border-radius: 10px;
      border: none;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      background: $mandalay;
      padding: $padding/2;
    }
  }
}
</style>
