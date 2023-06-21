<template>
  <main class="home container">
    <transition name="fade" mode="out-in">
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
import SkeletonCardProduct from "@/components/home/HomeCardProductSkeleton.vue";

export default {
  name: "HomeView",
  components: {
    CardProduct,
    SkeletonCardProduct,
  },
  data() {
    return {
      products: [],
      loading: true,
    };
  },
  methods: {
    fetchProducts() {
      this.loading = true;

      this.$requestExecutor(
        "query { allProducts { id image_url name price_in_cents } }",
        (success, response) => {
          if (success) {
            this.products = response.data?.allProducts;

            setTimeout(() => {
              this.loading = false;
            }, 500);
          }
        }
      );
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
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
