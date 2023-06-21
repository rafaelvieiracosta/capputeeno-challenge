<template>
  <div class="skl-product">
    <div class="skl-product__image-container">
      <div class="animate skl-product__image" />
    </div>
    <div class="produtc__data">
      <div class="animate skl-product__name"></div>
      <div class="skl-product__price">
        <div class="animate skl-product__price-text"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style scoped>
.skl-product {
  display: flex;
}
@media (min-width: 480px) {
  .skl-product {
    display: block;
  }
}

/* PRODUCT: IMAGE */
.skl-product__image-container {
  position: relative;
  border-radius: 4px 0 0 4px;
  overflow: hidden;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}
.skl-product__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
@media (min-width: 480px) {
  .skl-product__image-container {
    border-radius: 4px 4px 0 0;
    padding-top: 90.625%;
    width: 100%;
    height: auto;
  }
}
@media (min-width: 1024px) {
  .skl-product__image-container {
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
.skl-product__name {
  height: 27px;
  width: 100%;
  border-radius: 7px;
}
.skl-product__price {
  padding-top: 8px;
  margin-top: 8px;
  border-top: 1px solid var(--background-line);
}
.skl-product__price-text {
  height: 30px;
  width: 90px;
  border-radius: 7px;
}
@media (min-width: 480px) {
  .produtc__data {
    border-radius: 0 0 4px 4px;
  }
  .skl-product__name {
    height: 24px;
    width: 90%;
  }
  .skl-product__price-text {
    height: 21px;
    width: 40%;
  }
}
</style>
