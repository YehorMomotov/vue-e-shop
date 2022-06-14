import Vue from "vue";
import Router from "vue-router";
import eCatalog from "../components/catalog/e-products.vue";
import eCart from "../components/cart/e-cart";
import eMainPage from "../components/main-page/e-main-page";
import eCategoriesCatalog from "../components/catalog/e-catalog.vue";
import eCustom from "../components/custom/e-custom.vue";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: eMainPage,
    },
    {
      path: "/custom",
      name: "custom",
      component: eCustom,
    },
    {
      path: "/catalog",
      name: "catalog",
      component: eCategoriesCatalog,
    },
    {
      path: "/products",
      name: "products",
      component: eCatalog,
    },

    {
      path: "/cart",
      name: "cart",
      component: eCart,
      props: true,
    },
  ],
});

export default router;
