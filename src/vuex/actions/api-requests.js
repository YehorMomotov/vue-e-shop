import axios from "axios";
export default {
  GET_PRODUCTS_FROM_API({ commit }) {
    return axios("http://localhost:3000/products", {
      method: "GET",
    })
      .then((products) => {
        products.data.forEach((element) => {
          element.quantity = 1;
        });
        commit("SET_PRODUCTS_TO_STATE", products.data);
        return products;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
  GET_CATEGORIES_FROM_API({ commit }) {
    return axios("http://localhost:3000/categories", {
      method: "GET",
    })
      .then((categories) => {
        commit("SET_CATEGORIES_TO_STATE", categories.data);
        return categories;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
  GET_BURGER_PARTS_FROM_API({ commit }) {
    return axios("http://localhost:3000/burger-parts", {
      method: "GET",
    })
      .then((burgerParts) => {
        commit("SET_BURGER_PARTS_TO_STATE", burgerParts.data);
        return burgerParts;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
};
