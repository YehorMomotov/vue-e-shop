<template>
  <div class="e-custom">
    <div class="e-custom__description">
      <h1>Custom</h1>
      <h2>
        Here you can make burger by your own recipe. You only need to
        decide which ingredients to use.
        <h5>And don't forget about their order!</h5>
      </h2>
    </div>
    <div class="e-custom__burger-construction">
      <div class="e-custom__burger-construction__workshop">
        <div
          class="e-custom__burger-construction__workshop__parts"
          :style="{ zIndex: index }"
          v-for="(burgerPart, index) in currentBurgerParts"
          :key="index"
          @click="partActions(burgerPart)"
        >
          <div class="img-wrapper">
            <img
              :src="
                require('@/assets/images/burger-parts/' + burgerPart.image)
              "
              :alt="burgerPart.name"
              :title="burgerPart.name"
            />
          </div>
        </div>
      </div>
      <eIngredientsMenuVue
        :burgerParts="BURGER_PARTS"
        @addPart="addPart"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import eIngredientsMenuVue from "./e-ingredients-menu.vue";

export default {
  components: { eIngredientsMenuVue },
  name: "e-custom",
  data() {
    return {
      parts: [
        {
          image: "top-bread-bun.png",
          name: "top-bread-bun",
          available: true,
        },
        { image: "cutlet.png", name: "cutlet", available: true },
        {
          image: "chease-slice.png",
          name: "chease-slice",
          available: true,
        },
        {
          image: "middle-bread-bun.png",
          name: "middle-bread-bun",
          available: true,
        },
        { image: "mushrooms.png", name: "mushrooms", available: true },
        {
          image: "tomato-slice.png",
          name: "tomato-slice",
          available: true,
        },
        { image: "ketchup.png", name: "ketchup", available: true },
        { image: "fish-cutlet.png", name: "fish-cutlet", available: true },

        {
          image: "bottom-bread-bun.png",
          name: "bottom-bread-bun",
          available: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["BURGER_PARTS"]),
    currentBurgerParts() {
      return this.parts;
    },
  },
  methods: {
    partActions(part) {
      console.log(part);
    },
    addPart(part) {
      this.parts.push(part);
    },
    ...mapActions(["GET_BURGER_PARTS_FROM_API"]),
  },
  mounted() {
    this.GET_BURGER_PARTS_FROM_API();
    this.currentBurgerParts.reverse();
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
    &__workshop {
      flex-basis: 80%;
      display: flex;
      justify-content: flex-end;
      flex-direction: column-reverse;
      &__parts {
        height: 100px;
        margin: 0 auto;
        .img-wrapper {
          width: 300px;
          height: 170px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: -100 0;
          }
        }
      }
    }
  }
}
</style>
