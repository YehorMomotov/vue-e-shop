<template>
  <div class="e-selected-item" v-if="selectedItem.name !== 'none'">
    <h2>
      {{ selectedItem.name | kebabToNormal }}
      <br />#{{ selectedItem.id }}
    </h2>
    <div class="btns">
      <div class="move-btns">
        <button class="move-btns__up" @click="itemAction('up')">
          <span>Move Up</span>
          <i class="material-icons">arrow_upward</i></button
        ><button class="move-btns__down" @click="itemAction('down')">
          <span>Move Down</span>
          <i class="material-icons"> arrow_downward</i>
        </button>
      </div>
      <button class="remove-btn" @click="itemAction('remove')">
        <span>Remove</span><i class="material-icons">clear</i>
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
      <div class="species" v-if="selectedItem.species.length > 1">
        <eSelectVue
          :selected="selectedItem.selectedOption"
          :options="selectedItem.species"
          @select="selectSpecies"
        />
        <div>
          <input
            @change="apllyToAll(selectedItem.selectedOption)"
            type="checkbox"
            name="none"
            :checked="selectedItem.appliedToAll"
          />
          <span>Apply on similar ingredients?</span>
        </div>
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
  min-width: 330px;
  max-width: 330px;
  &__options {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      padding-right: 10px;
      width: 100px;
    }
    .species {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      input {
        margin-top: 10px;
      }
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
@media screen and (max-width: 768px) {
  .e-selected-item {
    min-width: 230px;
    max-width: 230px;
    &__options {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .btns {
      .move-btns {
        &__up,
        &__down {
          font-size: 1em;
        }
      }
      .remove-btn {
        font-size: 1em;
      }
    }
  }
}
@media screen and (max-width: 525px) {
  .e-selected-item {
    min-width: 120px;
    max-width: 120px;
    h2 {
      font-size: 0.9em;
    }
    &__options {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .species {
        input {
          width: 20px;
          height: 20px;
        }
      }
    }
    .btns {
      .move-btns {
        &__up,
        &__down {
          span {
            font-size: 0em;
          }
          .material-icons {
            font-size: 1em;
          }
        }
      }
      .remove-btn {
        span {
          font-size: 0em;
        }
        .material-icons {
          font-size: 1em;
        }
      }
    }
  }
}
@media screen and (max-width: 375px) {
  .e-selected-item {
    min-width: 90px;
    max-width: 90px;
    h2 {
      font-size: 0.7em;
    }
    p {
      font-size: 0.7em;
    }
    &__options {
      img {
        padding-right: 0;
        width: 70px;
      }
      .species {
        input {
          width: 15px;
          height: 15px;
        }
        span {
          font-size: 0.9em;
        }
      }
    }
  }
}
</style>
