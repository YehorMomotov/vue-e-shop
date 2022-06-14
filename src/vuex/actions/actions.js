export default {
  SET_SEARCH_VALUE({ commit }, value) {
    commit("COMMIT_SEARCH_VALUE", value);
  },
  SET_MOBILE({ commit }) {
    commit("SWITCH_MOBILE");
  },
  SET_DESKTOP({ commit }) {
    commit("SWITCH_DESKTOP");
  },
  INCREMENT_QUANTITY({ commit }, index) {
    commit("INCREMENT", index);
  },
  DECREMENT_QUANTITY({ commit }, index) {
    commit("DECREMENT", index);
  },
  ADD_TO_CART({ commit }, product) {
    commit("SET_CART", product);
  },
  DELETE_FROM_CART({ commit }, index) {
    commit("REMOVE_FROM_CART", index);
  },
  SET_SELECTED({ commit }, selected) {
    commit("SET_SELECTED", selected);
  },
};
