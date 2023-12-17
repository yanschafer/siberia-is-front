<script lang="ts">
import {MDBContainer, MDBRow} from "mdb-vue-ui-kit";
export default {
  name: 'HeaderComponent',
  components: { MDBContainer, MDBRow }
}
</script>

<template>
  <MDBContainer class="bg-container">
    <h1>Products</h1>
  </MDBContainer>
</template>

<style scoped>
.bg-container {
  background-color: #FCFCFC;
  width: 100%;
  display: flex;
  position: relative;
  left: 10vw;
}
</style>