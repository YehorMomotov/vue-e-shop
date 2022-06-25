<template>
  <div class="e-main-wrapper">
    <eNotificationsVue />
    <eHeaderVue />
    <keep-alive>
      <router-view
        class="e-main-wrapper__content main-width"
      ></router-view>
    </keep-alive>
    <eFooterVue />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import eFooterVue from "./layouts/e-footer.vue";
import eHeaderVue from "./layouts/e-header.vue";
import eNotificationsVue from "./notifications/e-notifications.vue";

export default {
  name: "e-main-wrapper",
  components: { eHeaderVue, eFooterVue, eNotificationsVue },
  props: {},
  data() {
    return {};
  },
  computed: { ...mapGetters(["CART"]) },
  methods: {},
  watch: {},
  mounted() {},
};
</script>

<style lang="scss">
.e-main-wrapper {
  align-items: center;
  &__content {
    background: $moccasin;
    border-radius: 5px;
    padding: $padding;
    padding-bottom: 0;
    padding-top: 150px;
    margin: 0 auto;
  }
}
</style>
