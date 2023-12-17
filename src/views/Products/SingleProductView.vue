<template>
  <div>
    <h1>Product Details</h1>
    <div v-if="productData">
      <p><strong>Name:</strong> asd</p>
      <p><strong>Sku:</strong> asd</p>
      <p><strong>Quantity:</strong> asd</p>
      <p><strong>Price:</strong> asd</p>
    </div>
    <div v-else>
      <p>Product not found</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

</script>