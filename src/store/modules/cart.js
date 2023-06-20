export default {
  state: {
    products: [{}, {}],
  },
  getters: {
    itemsInCart: (state) => {
      return state.products.length;
    },
  },
};
