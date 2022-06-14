<template>
  <div class="e-select">
    <p
      class="e-select__title"
      @click="openSelect"
      :class="{ active: areOptionsVisible }"
    >
      {{ selected }}
    </p>
    <div class="e-select__options" v-if="areOptionsVisible">
      <p
        :class="{ needed_background: areOptionsVisible }"
        class="e-select__option"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "e-select",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      areOptionsVisible: false,
    };
  },

  methods: {
    openSelect() {
      this.areOptionsVisible = true;
    },
    selectOption(option) {
      this.$emit("select", option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSelect);
  },
};
</script>

<style lang="scss">
.e-select {
  user-select: none;
  font-size: 1.3em;
  position: relative;
  width: 200px;
  cursor: pointer;
  background: $sandy_beach_light;
  :hover {
    background: $sandy_beach;
  }
  .needed_background {
    background: #ffffff;
  }
  text-align: left;
  &__title {
    border: solid 1px #aeaeae;
    border-radius: 10px;
    margin: 0;
    padding: 8px;
    transition: background 300ms ease;
  }
  &__option:last-child {
    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  &__option {
    margin: 0;
    padding: 8px;
    transition: background 300ms ease;
  }
  &__options {
    width: 200px;
    box-sizing: border-box;
    box-shadow: 8px 8px 8px black;
    border: solid 1px #aeaeae;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background: #ffffff;
    position: absolute;
    :hover {
      background: $hillary;
    }
  }
  .active {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background: $sandy_beach;
  }
}
</style>
