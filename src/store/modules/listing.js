export default {
  state: () => ({
    searchWord: "",
    category: "all",
  }),
  mutations: {
    SET_SEARCH_WORD(state, payload) {
      state.searchWord = payload;
    },
    SET_CATEGORY(state, payload) {
      state.category = payload;
    },
  },
};
