<template>
  <router-link :to="{ path: product.id }" class="product">
    <img
      :src="product.image_url"
      :alt="product.name"
      :width="$sw >= 480 ? 256 : 120"
      :height="$sw >= 480 ? 300 : 120"
      class="product__image"
      draggable="false"
    />
    <div class="produtc__data">
      <h2 class="product__name">{{ product.name }}</h2>
      <p class="product__price">{{ product.price_in_cents | priceInReal }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style scoped>
.product {
  display: flex;
}
@media (min-width: 480px) {
  .product {
    display: block;
  }
}

/* PRODUCT: IMAGE */
.product__image {
  object-fit: cover;
  border-radius: 4px 0 0 4px;
}
@media (min-width: 480px) {
  .product__image {
    border-radius: 4px 4px 0 0;
    width: 100%;
    height: auto;
  }
}
@media (min-width: 1024px) {
  .product__image {
    height: 300px;
  }
}

/* PRODUCT: NAME AND PRICE */
.produtc__data {
  width: 100%;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--background);
  border-radius: 0 4px 4px 0;
}
.product__name {
  font-weight: 300;
  font-size: 18px;
  line-height: 150%;
  color: var(--dark-low);
}
.product__price {
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  color: var(--dark);
  padding-top: 8px;
  margin-top: 8px;
  border-top: 1px solid var(--background-line);
}
@media (min-width: 480px) {
  .produtc__data {
    border-radius: 0 0 4px 4px;
  }
  .product__name {
    font-size: 16px;
  }
  .product__price {
    font-size: 14px;
  }
}
</style>
