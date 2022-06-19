<template>
  <div class="e-notification">
    <transition-group name="e-transition-animate" class="notifications">
      <div
        class="e-notification__content"
        v-for="message in messages"
        :class="[message.type]"
        :key="message.id"
      >
        <div class="e-notification__content__text">
          <span>{{ message.name }}</span>
          <i class="material-icons">{{
            message.type === "error"
              ? "error"
              : message.type === "warning"
              ? "warning"
              : "done"
          }}</i>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "e-notifications",
  props: {},
  methods: {
    ...mapActions(["REMOVE_NOTIFICATIONS"]),
    hideNotif() {
      if (this.messages.length) {
        setTimeout(() => {
          this.REMOVE_NOTIFICATIONS(0);
        }, 3000);
      }
    },
  },
  computed: {
    ...mapGetters(["NOTIFICATIONS"]),
    messages() {
      return this.NOTIFICATIONS;
    },
  },
  watch: {
    messages() {
      this.hideNotif();
    },
  },
};
</script>

<style lang="scss" scoped>
.e-notification {
  position: fixed;
  top: 80px;
  user-select: none;
  right: 20px;
  .succeed {
    background: green;
  }
  .error {
    background: red;
  }
  .warning {
    background: darkorange;
  }
  z-index: 101;
  background: transparent !important;
  &__content {
    padding: $padding * 2;
    margin-bottom: 20px;
    border-radius: 4px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
  &__content {
    &__text {
      display: flex;
      background: transparent !important;
      span {
        background: transparent !important;
      }
      align-items: center;
      justify-content: space-between;
    }
  }
  .material-icons {
    margin-left: 10px;
    background: transparent !important;
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
