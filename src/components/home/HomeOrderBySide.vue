<template>
  <transition
    name="fade"
    @before-enter="beforeEnterWrapper"
    @after-enter="afterEnterWrapper"
  >
    <div
      v-if="openWrapperOrder"
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

            <h2 class="filter__title">ORDERNAR POR</h2>
          </div>

          <div class="filter-body">
            <ul class="filter__options">
              <li class="filter__item" v-if="currentOrder">
                <input
                  id="order_null"
                  type="radio"
                  name="order"
                  v-model="order"
                  value=""
                />
                <label for="order_null" class="filter__item-label">
                  <div class="filter__item-radio"></div>
                  Sem ordenação
                </label>
              </li>
              <li class="filter__item">
                <input
                  id="created_at--DSC"
                  type="radio"
                  name="order"
                  v-model="order"
                  value="created_at--DSC"
                />
                <label for="created_at--DSC" class="filter__item-label">
                  <div class="filter__item-radio"></div>
                  Novidades
                </label>
              </li>
              <li class="filter__item">
                <input
                  id="price_in_cents--DSC"
                  type="radio"
                  name="order"
                  v-model="order"
                  value="price_in_cents--DSC"
                />
                <label for="price_in_cents--DSC" class="filter__item-label">
                  <div class="filter__item-radio"></div>
                  Preço: Maior - menor
                </label>
              </li>
              <li class="filter__item">
                <input
                  id="price_in_cents--ASC"
                  type="radio"
                  name="order"
                  v-model="order"
                  value="price_in_cents--ASC"
                />
                <label for="price_in_cents--ASC" class="filter__item-label">
                  <div class="filter__item-radio"></div>
                  Preço: Menor - maior
                </label>
              </li>
              <li class="filter__item">
                <input
                  id="sales--DSC"
                  type="radio"
                  name="order"
                  v-model="order"
                  value="sales--DSC"
                />
                <label for="sales--DSC" class="filter__item-label">
                  <div class="filter__item-radio"></div>
                  Mais vendidos
                </label>
              </li>
            </ul>
          </div>

          <div class="filter-footer">
            <button class="filter--apply" @click="applyOrder">Aplicar</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    openWrapperOrder: Boolean,
  },
  data() {
    return {
      order: "",
      openFilter: false,
    };
  },
  computed: {
    currentOrder() {
      return this.$store.state.listing.ordination.field &&
        this.$store.state.listing.ordination.order
        ? `${this.$store.state.listing.ordination.field}--${this.$store.state.listing.ordination.order}`
        : "";
    },
  },
  watch: {
    $sw() {
      this.order = this.currentOrder;
    },
  },
  methods: {
    applyOrder() {
      const field = this.order.split("--")[0];
      const order = this.order.split("--")[1];

      this.$store.commit("SET_ORDINATION", { name: "", field, order });
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
      this.$emit("update:openWrapperOrder", false);
      document.body.style.overflow = "initial";
      this.order = this.currentOrder;
    },
  },
  mounted() {
    this.order = this.currentOrder;
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
