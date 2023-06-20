<template>
  <form class="search" @submit="handleSubmit" autocomplete="off">
    <input
      ref="inputSearch"
      v-model="valueInput"
      id="search"
      type="text"
      class="search__input"
      placeholder="Procurando por algo específico?"
    />
    <button type="submit" class="search__button">
      <img
        src="@/assets/images/magnifying-glass.svg"
        alt="Lupa"
        width="26"
        height="26"
      />
    </button>
  </form>
</template>

<script>
export default {
  name: "HeaderSearch",
  data() {
    return {
      valueInput: "",
    };
  },
  methods: {
    handleSubmit() {
      event.preventDefault();
      this.$store.commit("SET_SEARCH_WORD", this.valueInput);
      this.valueInput = "";
      this.$refs.inputSearch.blur();
    },
  },
};
</script>

<style scoped>
.search {
  position: relative;
  flex: 1;
}
.search__input {
  margin-top: 15px;
  padding: 9px 55px 9px 15px;
  border-radius: 8px;
  background-color: #f3f5f6;
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 22px;
  transition: border-color 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.search__input:focus {
  border-color: var(--orange-low);
}
.search__button {
  position: absolute;
  top: 8px;
  right: 16px;
}
@media (min-width: 768px) {
  .search {
    max-width: 352px;
  }
  .search__input {
    margin-top: 0;
  }
}
</style>
