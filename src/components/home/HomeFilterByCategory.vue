<template>
  <div class="categories">
    <button
      class="categories--button"
      @click="changeCategory('all', '')"
      :class="{
        active: currentCategory.query === 'all',
      }"
      data-title="Todos os produtos"
    >
      Todos os produtos
    </button>
    <button
      class="categories--button"
      @click="changeCategory('t-shirts', 'Camisetas')"
      :class="{
        active: currentCategory.query === 't-shirts',
      }"
      data-title="Camisetas"
    >
      Camisetas
    </button>
    <button
      class="categories--button"
      @click="changeCategory('mugs', 'Canecas')"
      :class="{
        active: currentCategory.query === 'mugs',
      }"
      data-title="Canecas"
    >
      Canecas
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teste: false,
    };
  },
  computed: {
    currentCategory() {
      return this.$store.state.listing.category;
    },
  },
  methods: {
    changeCategory(category, title) {
      this.$store.commit("SET_CATEGORY", { name: title, query: category });
    },
  },
};
</script>

<style scoped>
.categories {
  display: flex;
  align-items: center;
  gap: 40px;
}
.categories--button {
  position: relative;
  font-size: 16px;
  line-height: 22px;
  text-transform: uppercase;
  color: var(--text-supporting);
  cursor: pointer;
}
.categories--button::before {
  display: block;
  content: attr(data-title);
  font-weight: 400;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.categories--button::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0;
  left: 0;
  bottom: -8px;
  background-color: var(--orange-low);
  transition: 0.2s;
  opacity: 0;
}
.categories--button.active {
  font-weight: 600;
}
.categories--button.active::after {
  opacity: 1;
  height: 4px;
}
</style>
