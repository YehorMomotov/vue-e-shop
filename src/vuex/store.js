import Vue from "vue";
import Vuex from "vuex";
import commonActions from "./actions/actions";
import apiRequests from "./actions/api-requests";
import getters from "./getters/getters";
import mutations from "./mutations/mutations";
const actions = { ...commonActions, ...apiRequests };
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    selected: "All",
    searchValue: "",
    isMobile: false,
    isDesktop: true,
    products: [],
    cart: [],
    categories: [],
  },
  mutations,
  actions,
  getters,
});

export default store;
