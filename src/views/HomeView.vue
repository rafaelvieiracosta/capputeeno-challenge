<template>
  <main class="home container">
    <div class="home__top-container">
      <FilterByCategory class="home__filter" :class="{ 'no-click': loading }" />
      <OrderBy class="home__order" :class="{ 'no-click': loading }" />
    </div>

    <transition name="" mode="out-in">
      <div v-if="loading" class="home__grid" key="skeleton">
        <SkeletonCardProduct
          v-for="(_, index) in 12"
          :key="`product-${index}`"
        />
      </div>

      <div v-else class="home__grid" key="products">
        <CardProduct
          v-for="(product, index) in products"
          :key="`product-${index}`"
          :product="product"
        />
      </div>
    </transition>
  </main>
</template>

<script>
import CardProduct from "@/components/home/HomeCardProduct.vue";
import FilterByCategory from "@/components/home/HomeFilterByCategory.vue";
import OrderBy from "@/components/home/HomeOrderBy.vue";

import SkeletonCardProduct from "@/components/home/HomeCardProductSkeleton.vue";

export default {
  name: "HomeView",
  components: {
    CardProduct,
    FilterByCategory,
    OrderBy,
    SkeletonCardProduct,
  },
  data() {
    return {
      products: [],
      loading: true,
    };
  },
  watch: {
    "$store.state.listing.category"() {
      this.fetchProducts();
    },
    "$store.state.listing.field"() {
      this.fetchProducts();
    },
    "$store.state.listing.order"() {
      this.fetchProducts();
    },
  },
  computed: {
    currentCategory() {
      return this.$store.state.listing.category === "all"
        ? false
        : this.$store.state.listing.category;
    },
    currentField() {
      return this.$store.state.listing.field;
    },
    currentOrder() {
      return this.$store.state.listing.order;
    },
  },
  methods: {
    handleQuery() {
      let query;
      if (this.currentCategory && this.currentField) {
        query = `query { allProducts(filter: { category: "${this.currentCategory}" }, sortField: "${this.currentField}", sortOrder: "${this.currentOrder}") { id image_url name price_in_cents } }`;
      } else if (this.currentField) {
        query = `query { allProducts(sortField: "${this.currentField}", sortOrder: "${this.currentOrder}") { id image_url name price_in_cents } }`;
      } else if (this.currentCategory) {
        query = `query { allProducts(filter: { category: "${this.currentCategory}" }) { id image_url name price_in_cents } }`;
      } else {
        query =
          "query { allProducts { id image_url name price_in_cents category } }";
      }

      return query;
    },
    fetchProducts() {
      this.loading = true;

      this.$requestExecutor(this.handleQuery(), (success, response) => {
        if (success) {
          this.products = response.data?.allProducts;

          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      });
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.no-click {
  opacity: 0.7;
  pointer-events: none;
}

.home__top-container {
  margin-top: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.home__grid {
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px 32px;
}
@media (min-width: 480px) {
  .home__grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 365ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
