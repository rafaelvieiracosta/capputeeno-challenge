<template>
  <div id="app">
    <DefaultHeader />

    <router-view></router-view>
  </div>
</template>

<script>
import DefaultHeader from "@/components/default/DefaultHeader";

export default {
  components: {
    DefaultHeader,
  },
};
</script>

<style></style>
