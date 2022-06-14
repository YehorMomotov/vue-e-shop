<template>
  <div class="e-main-wrapper">
    <eHeaderVue />
    <keep-alive>
      <router-view class="e-main-wrapper__content"></router-view>
    </keep-alive>
    <eFooterVue />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import eFooterVue from "./layouts/e-footer.vue";
import eHeaderVue from "./layouts/e-header.vue";

export default {
  name: "e-main-wrapper",
  components: { eHeaderVue, eFooterVue },
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
    padding: $padding * 2;
    max-width: $body_width - 16px;
    padding-bottom: 100px;
    padding-top: 150px;
    margin: 0 auto;
  }
}
</style>
