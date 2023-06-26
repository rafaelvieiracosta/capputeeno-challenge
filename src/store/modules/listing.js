export default {
  state: () => ({
    searchWord: "",
    category: "all",
    categoryTitle: "Todos os produtos",
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
    SET_CATEGORY_TITLE(state, payload) {
      state.categoryTitle = payload;
    },
    SET_FIELD(state, payload) {
      state.field = payload;
    },
    SET_ORDER(state, payload) {
      state.order = payload;
    },
  },
};
