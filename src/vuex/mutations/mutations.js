export default {
  COMMIT_SEARCH_VALUE: (state, value) => {
    state.searchValue = value;
  },
  SWITCH_MOBILE: (state) => {
    state.isMobile = true;
    state.isDesktop = false;
  },
  SWITCH_DESKTOP: (state) => {
    state.isMobile = false;
    state.isDesktop = true;
  },
  INCREMENT: (state, index) => {
    state.cart[index].quantity++;
  },
  DECREMENT: (state, index) => {
    if (state.cart[index].quantity > 1) {
      state.cart[index].quantity--;
    }
  },
  SET_PRODUCTS_TO_STATE: (state, products) => {
    state.products = products;
  },
  SET_CATEGORIES_TO_STATE: (state, categories) => {
    state.categories = categories;
  },
  SET_CART: (state, product) => {
    if (state.cart.length) {
      let isProductExist = false;
      state.cart.map(function (item) {
        if (item.article === product.article) {
          isProductExist = true;
          item.quantity++;
        }
      });
      if (!isProductExist) {
        state.cart.push(product);
      }
    } else {
      state.cart.push(product);
    }
  },
  REMOVE_FROM_CART: (state, index) => {
    state.cart[index].quantity = 1;
    state.cart.splice(index, 1);
  },
  SET_SELECTED: (state, selected) => {
    state.selected = selected;
  },
};
