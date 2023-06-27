export default {
  state: () => ({
    search: "",
    category: {
      name: "Todos os produtos",
      query: "all",
    },
    ordination: {
      name: "",
      field: "",
      order: "",
    },
  }),
  mutations: {
    SET_SEARCH(state, payload) {
      state.search = payload;
    },
    SET_CATEGORY(state, payload) {
      state.category = payload;
    },
    SET_ORDINATION(state, payload) {
      state.ordination = payload;
    },
  },
};
