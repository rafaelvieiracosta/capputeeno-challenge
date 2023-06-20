<template>
  <header class="header">
    <div class="header-wrapper container">
      <div class="header-line">
        <router-link to="/" class="header__logo"> capputeeno </router-link>

        <div class="header__search-and-cart">
          <HeaderSearch v-if="$sw >= 768" class="header__search" />

          <div class="header__cart">
            <router-link to="/cart" class="header__cart-icon">
              <img
                src="@/assets/images/bag.svg"
                alt="Sacola de compras"
                width="24"
                height="24"
              />
            </router-link>
            <span v-if="itemsInCart > 0" class="header__cart-count">{{
              itemsInCart
            }}</span>
          </div>
        </div>
      </div>

      <HeaderSearch v-if="$sw < 768" class="header__search" />
    </div>
  </header>
</template>

<script>
import HeaderSearch from "../header/HeaderSearch.vue";

export default {
  name: "DefaultHeader",
  components: {
    HeaderSearch,
  },
  computed: {
    itemsInCart() {
      return this.$store.getters.itemsInCart;
    },
  },
};
</script>

<style scoped>
.header {
  background-color: var(--background);
}
.header-wrapper {
  padding: 15px;
}
.header-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
@media (min-width: 768px) {
  .header-wrapper {
    padding: 0 15px;
  }
}

/* HEADER: LOGO */
.header__logo {
  font-family: "Saira Stencil One";
  font-weight: 400;
  font-size: 30px;
  color: #5d5d6d;
  user-select: none;
}
@media (min-width: 768px) {
  .header__logo {
    font-size: 40px;
    line-height: 80px;
  }
}

/* HEADER: SEARCH AND CART WRAPPER */
.header__search-and-cart {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
}
@media (min-width: 768px) {
  .header__search-and-cart {
    flex: 1;
  }
}

/* HEADER: CART */
.header__cart {
  position: relative;
}
.header__cart-icon {
  display: block;
  max-width: 42px;
  padding: 9px;
  border-radius: 84px;
  transition: 0.2s;
  cursor: pointer;
}
.header__cart-icon:hover {
  background-color: #e1e1e6;
}
.header__cart-count {
  position: absolute;
  bottom: 1px;
  left: 25px;
  padding: 0 5px;
  min-width: 17px;
  max-width: 5ch;
  font-weight: 500;
  font-size: 10px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
  background-color: var(--red);
  border-radius: 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}
</style>
