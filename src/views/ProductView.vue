<template>
  <div class="home__grid">
    <h1>produto</h1>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    fetchProducts() {
      this.$requestExecutor(
        "query { allProducts { id image_url name price_in_cents } }",
        (success, response) => {
          if (success) {
            this.products = response.data?.allProducts;
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

<style></style>
