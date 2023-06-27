<template>
  <main class="home container">
    <div v-if="$sw >= 768" class="home__top-container">
      <FilterByCategory class="home__filter" :class="{ 'no-click': loading }" />
      <OrderBy class="home__order" :class="{ 'no-click': loading }" />
    </div>
    <div v-else class="home__top-container">
      <h1 class="home__title">{{ currentCategory.name }}</h1>

      <div class="home__buttons">
        <button class="home--button" @click="openWrapperFilter = true">
          Filtrar
        </button>
        <button class="home--button" @click="openWrapperOrder = true">
          Ordernar
        </button>
      </div>
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

    <FilterByCategorySide :openWrapperFilter.sync="openWrapperFilter" />
    <OrderBySide :openWrapperOrder.sync="openWrapperOrder" />
  </main>
</template>

<script>
import CardProduct from "@/components/home/HomeCardProduct.vue";
import FilterByCategory from "@/components/home/HomeFilterByCategory.vue";
import FilterByCategorySide from "@/components/home/HomeFilterByCategorySide.vue";
import OrderBy from "@/components/home/HomeOrderBy.vue";
import OrderBySide from "@/components/home/HomeOrderBySide.vue";

import SkeletonCardProduct from "@/components/home/HomeCardProductSkeleton.vue";

export default {
  name: "HomeView",
  components: {
    CardProduct,
    FilterByCategory,
    FilterByCategorySide,
    OrderBy,
    OrderBySide,
    SkeletonCardProduct,
  },
  data() {
    return {
      products: [],
      loading: true,

      openWrapperFilter: false,
      openWrapperOrder: false,
    };
  },
  watch: {
    "$store.state.listing.category"() {
      this.fetchProducts();
    },
    "$store.state.listing.ordination"() {
      this.fetchProducts();
    },
  },
  computed: {
    currentCategory() {
      return this.$store.state.listing.category;
    },
    currentOrdination() {
      return this.$store.state.listing.ordination;
    },
  },
  methods: {
    handleQuery() {
      let query;

      if (
        this.currentCategory.query !== "all" &&
        this.currentOrdination.field
      ) {
        query = `query { allProducts(filter: { category: "${this.currentCategory.query}" }, sortField: "${this.currentOrdination.field}", sortOrder: "${this.currentOrdination.order}") { id image_url name price_in_cents } }`;
      } else if (this.currentOrdination.field) {
        query = `query { allProducts(sortField: "${this.currentOrdination.field}", sortOrder: "${this.currentOrdination.order}") { id image_url name price_in_cents } }`;
      } else if (this.currentCategory.query !== "all") {
        query = `query { allProducts(filter: { category: "${this.currentCategory.query}" }) { id image_url name price_in_cents } }`;
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
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
}
.home__title {
  font-size: 24px;
  font-weight: 600;
  line-height: 150%;
  text-transform: uppercase;
}
.home__buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}
.home--button {
  width: 100%;
  padding: 5px 20px;
  text-align: center;
  border-radius: 62px;
  background-color: var(--blue);
  color: #f5f5fa;
  text-transform: uppercase;
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
@media (min-width: 768px) {
  .home__top-container {
    align-items: center;
    flex-direction: row;
  }
}
</style>
