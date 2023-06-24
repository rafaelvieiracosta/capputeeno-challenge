export default {
  state: () => ({
    searchWord: "",
    category: "all",
    field: "",
    order: "",
  }),
  mutations: {
    SET_SEARCH_WORD(state, payload) {
      state.searchWord = payload;
    },
    SET_CATEGORY(state, payload) {
      state.category = payload;
    },
    SET_FIELD(state, payload) {
      state.field = payload;
    },
    SET_ORDER(state, payload) {
      state.order = payload;
    },
  },
};
