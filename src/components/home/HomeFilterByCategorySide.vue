<template>
  <transition
    name="fade"
    @before-enter="beforeEnterWrapper"
    @after-enter="afterEnterWrapper"
  >
    <div
      v-if="openWrapperFilter"
      class="filter-wrapper"
      @click.self="closeFilter"
    >
      <transition name="slideIn" @after-leave="afterLeave">
        <div v-if="openFilter" class="filter">
          <div class="filter-header">
            <button class="filter--close" @click="closeFilter">
              <img
                src="@/assets/images/arrow-back.svg"
                alt="Seta voltada para trás"
                width="24"
                height="24"
              />

              Fechar
            </button>

            <h2 class="filter__title">Categoria</h2>
          </div>

          <div class="filter-body">
            <ul class="filter__options">
              <li class="filter__item">
                <input
                  id="all"
                  type="radio"
                  name="category"
                  v-model="category"
                  value="all"
                />
                <label for="all" class="filter__item-label">
                  <div class="filter__item-radio"></div>
                  Todos os produtos
                </label>
              </li>
              <li class="filter__item">
                <input
                  id="t-shirts"
                  type="radio"
                  name="category"
                  v-model="category"
                  value="t-shirts"
                />
                <label for="t-shirts" class="filter__item-label">
                  <div class="filter__item-radio"></div>
                  Camisetas
                </label>
              </li>
              <li class="filter__item">
                <input
                  id="mugs"
                  type="radio"
                  name="category"
                  v-model="category"
                  value="mugs"
                />
                <label for="mugs" class="filter__item-label">
                  <div class="filter__item-radio"></div>
                  Canecas
                </label>
              </li>
            </ul>
          </div>

          <div class="filter-footer">
            <button class="filter--apply" @click="applyCategory">
              Aplicar
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    openWrapperFilter: Boolean,
  },
  data() {
    return {
      category: "",
      openFilter: false,
    };
  },
  computed: {
    currentCategory() {
      return this.$store.state.listing.category;
    },
  },
  methods: {
    applyCategory() {
      let title;
      switch (this.category) {
        case "t-shirts":
          title = "Camisetas";
          break;
        case "mugs":
          title = "Canecas";
          break;
        default:
          title = "Todos os produtos";
          break;
      }

      this.$store.commit("SET_CATEGORY", this.category);
      this.$store.commit("SET_CATEGORY_TITLE", title);
      this.closeFilter();
    },

    closeFilter() {
      this.openFilter = false;
    },
    beforeEnterWrapper() {
      document.body.style.overflow = "hidden";
    },
    afterEnterWrapper() {
      this.openFilter = true;
    },
    afterLeave() {
      this.$emit("update:openWrapperFilter", false);
      document.body.style.overflow = "initial";
      this.category = this.currentCategory;
    },
  },
  mounted() {
    this.category = this.currentCategory;
  },
};
</script>

<style scoped>
.filter-wrapper {
  position: fixed;
  background: var(--wrapper, #00000090);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.filter {
  display: flex;
  flex-direction: column;
  max-width: 280px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: var(--background-main);
  border-radius: 0 10px 0 0;
  overflow: hidden;
}

/* FILTER: HEADER - BACK AND TITLE */
.filter--close {
  padding: 24px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  color: var(--text);
  background-color: var(--background);
}
.filter__title {
  margin-top: 20px;
  font-size: 24px;
  font-weight: 500;
  line-height: 150%;
  text-transform: uppercase;
  color: var(--dark-low);
  padding: 0 16px;
}

/* FILTER: BODY - OPTIONS */
.filter-body {
  flex: 1 0 60px;
  margin-top: 12px;
  padding: 0 16px 16px;
  overflow-y: auto;
}
.filter__options {
  margin-top: 8px;
}
.filter__item + .filter__item {
  margin-top: 6px;
}
.filter__item input {
  display: none;
}
.filter__item-label {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background-color: var(--background);
  padding: 10px 12px;
  transition: 0.2s;
  color: var(--text-supporting);
}
.filter__item-radio {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: var(--background-line);
  transition: 0.2s;
}
.filter__item input:checked ~ .filter__item-label {
  background-color: #ffa58535;
}
.filter__item input:checked ~ .filter__item-label > .filter__item-radio {
  background-color: var(--orange-low);
}

/* FILTER: FOOTER - BUTTON */
.filter-footer {
  padding: 16px;
}
.filter--apply {
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  text-transform: uppercase;
  border-radius: 4px;
  background-color: var(--blue);
  color: #f5f5fa;
  cursor: pointer;
}
</style>
