export default {
  state: () => ({
    searchWord: "",
  }),
  mutations: {
    SET_SEARCH_WORD(state, payload) {
      state.searchWord = payload;
    },
  },
};
