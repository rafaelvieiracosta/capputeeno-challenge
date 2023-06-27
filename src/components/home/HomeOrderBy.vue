<template>
  <div class="order">
    <button
      class="order__button"
      :class="{ opened: showOptions }"
      @click.stop="showOptions ? closeOptions() : openOptions()"
    >
      Ordernar por<template v-if="ordination.name">: &nbsp;</template>
      <span>
        {{ ordination.name }}
      </span>

      <img
        src="@/assets/images/arrow-down.svg"
        alt="Seta"
        width="24"
        height="24"
      />
    </button>
    <ul v-show="showOptions" class="order__list" ref="listOptions">
      <li
        v-if="ordination.field && ordination.order"
        class="order__list-item"
        @click="handleOrdination({ name: '', field: '', order: '' })"
      >
        Sem ordenação
      </li>
      <li
        v-if="ordination.field !== 'Novidades'"
        class="order__list-item"
        @click="
          handleOrdination({
            name: 'Novidades',
            field: 'created_at',
            order: 'DSC',
          })
        "
      >
        Novidades
      </li>
      <li
        v-if="
          ordination.field !== 'Preço: Maior - menor' &&
          ordination.order !== 'DSC'
        "
        class="order__list-item"
        @click="
          handleOrdination({
            name: 'Preço: Maior - menor',
            field: 'price_in_cents',
            order: 'DSC',
          })
        "
      >
        Preço: Maior - menor
      </li>
      <li
        v-if="
          ordination.field !== 'Preço: Menor - maior' &&
          ordination.order !== 'ASC'
        "
        class="order__list-item"
        @click="
          handleOrdination({
            name: 'Preço: Menor - maior',
            field: 'price_in_cents',
            order: 'ASC',
          })
        "
      >
        Preço: Menor - maior
      </li>
      <li
        v-if="ordination.field !== 'Mais vendidos'"
        class="order__list-item"
        @click="
          handleOrdination({
            name: 'Mais vendidos',
            field: 'sales',
            order: 'DSC',
          })
        "
      >
        Mais vendidos
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOptions: false,
    };
  },
  computed: {
    ordination() {
      return this.$store.state.listing.ordination;
    },
  },
  watch: {
    $sw() {
      this.closeOptions();
    },
  },
  methods: {
    handleOrdination(option) {
      this.$store.commit("SET_ORDINATION", option);
      this.showOptions = false;
    },

    detectOutsideClick(event) {
      if (!this.$refs.listOptions.contains(event.target)) {
        this.closeOptions();
      }
    },
    openOptions() {
      this.showOptions = true;
      document.addEventListener("click", this.detectOutsideClick);
    },
    closeOptions() {
      this.showOptions = false;
      document.removeEventListener("click", this.detectOutsideClick);
    },
  },
};
</script>

<style scoped>
.order {
  position: relative;
}
.order__button {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 22px;
  color: var(--text-supporting);
  cursor: pointer;
  user-select: none;
}
.order__button span {
  font-weight: 600;
}
.order__button img {
  transition: 0.2s;
  margin-left: 8px;
}
.order__button.opened img {
  transform: rotate(180deg);
}

.order__list {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  border-radius: 4px;
  overflow: hidden;
  background: var(--background);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
}
.order__list-item {
  text-align: left;
  white-space: nowrap;
  padding: 2px 16px;
  color: var(--text-supporting);
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  user-select: none;
}
.order__list-item:first-child {
  padding-top: 12px;
}
.order__list-item:last-child {
  padding-bottom: 12px;
}
.order__list-item:hover {
  background-color: var(--background-main);
}
</style>
