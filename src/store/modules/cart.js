export default {
  state: () => ({
    itemsInCart: 0,
  }),
  mutations: {
    SET_ITEMS_IN_CART(state, payload) {
      state.itemsInCart = payload;
    },
  },
};
