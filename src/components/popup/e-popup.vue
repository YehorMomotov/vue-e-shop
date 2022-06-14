<template>
  <div class="popup-wrapper" ref="popup-wrapper">
    <div class="e-popup">
      <div class="e-popup__header">
        <span> {{ popupTitle }}</span>
        <span
          ><i class="material-icons" @click="closePopup">close</i></span
        >
      </div>
      <div class="e-popup__content"><slot></slot></div>
      <div class="e-popup__footer">
        <button class="close-btn" @click="closePopup">Close info</button>
        <button class="add-btn" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "e-popup",
  props: { popupTitle: { type: String, default: "Ok" } },
  data() {
    return {};
  },
  computed: {},
  methods: {
    addToCart() {
      this.$emit("addToCartAction");
    },
    closePopup() {
      this.$emit("closePopup");
    },
  },
  mounted() {
    document.addEventListener("click", (item) => {
      if (item.target === this.$refs["popup-wrapper"]) {
        this.closePopup();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
* {
  background: white !important;
}
.popup-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  backdrop-filter: blur(4px);
  background: #00000070 !important;
}
.e-popup {
  z-index: 4;
  padding: $padding * 2;

  position: fixed;
  top: 170px;
  box-shadow: 0 0 17px 0 #e7e7e7;
  width: min-content;
  &__header {
    font-size: 1.4em;
    margin-bottom: 8px;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
      border-radius: 10px;
      box-shadow: 0 0 5px black;
    }
    p:last-child {
      margin: 0 auto;
      margin-right: 0;
    }
  }
  &__footer {
    margin: 0 auto;
    .close-btn,
    .add-btn {
      border-radius: 10px;
      font-size: 1.3em;
      border: none;
      padding: $padding;
      width: 120px;
      color: black;
      background: #26ae68 !important;
    }
    .close-btn {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      background: $mandalay;
      padding-right: $padding/2;

      color: black;

      background: $mandalay !important;
    }
    .add-btn {
      padding-left: $padding/2;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      background: $green_bg;
    }
    :hover {
      background: $hillary !important;
    }
  }
}
</style>
