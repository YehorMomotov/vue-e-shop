<template>
  <div class="e-notification">
    <transition-group name="e-transition-animate" class="notifications">
      <div
        class="e-notification__content"
        v-for="message in messages"
        :key="message.id"
      >
        <div class="content__text">
          <span>{{ message.name }}</span>
          <i class="material-icons">check_circle</i>
        </div>
        <div class="content__btns">
          <button v-if="LB.length">{{ LB }}</button>
          <button v-if="RB.length">{{ RB }}</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "e-notifications",
  props: {
    messages: {
      type: Array,
      default: () => {
        return [];
      },
    },
    LB: { type: String, default: "" },
    RB: { type: String, default: "" },
  },
  methods: {
    hideNotif() {
      if (this.messages.length) {
        setTimeout(() => {
          this.$emit("removeMessage");
        }, 3000);
      }
    },
  },
  watch: {
    messages() {
      this.hideNotif();
    },
  },
  mounted() {
    this.hideNotif();
  },
};
</script>

<style lang="scss" scoped>
.e-notification {
  position: fixed;
  top: 80px;
  user-select: none;
  right: 20px;
  z-index: 101;
  background: transparent !important;
  &__content {
    padding: $padding * 2;
    background: green !important;
    margin-bottom: 20px;
    border-radius: 4px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
  .content {
    &__text {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .material-icons {
    margin-left: 10px;
  }
}
.e-transition-animate {
  &-enter {
    transform: translateX(120px);
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.6s ease;
  }
  &-enter-to {
    opacity: 1;
  }
  &-leave {
    height: 50px;
    opacity: 1;
  }
  &-leave-active {
    transition: transform 0.6s ease, opacity 0.6s, height 0.6s 0.2s;
  }
  &-leave-to {
    height: 0;
    transform: translateX(120px);
    opacity: 0;
  }
  &-move {
    transition: transform 0.6s ease;
  }
}
</style>
