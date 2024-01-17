<template>
  <MDBContainer class="animate__animate animate__fadeIn d-flex flex-column justify-content-center align-items-center message-container">
    <component :is="infoIcon" class="animate__animated animate__headShake" color="#B8B8B8" :size="128" stroke-width="2" />
    <h4 class="text-center message-heading">{{ infoTitle }}</h4>
    <p>{{ infoText }}</p>
  </MDBContainer>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {MDBContainer} from "mdb-vue-ui-kit";
import {IconInfoCircle, IconSearchOff} from "@tabler/icons-vue";

export default defineComponent({
  name: 'InfoMessageComponent',
  components: {MDBContainer, IconInfoCircle, IconSearchOff},
  props: {
    infoTitle: String,
    infoText: String,
    infoIcon: String
  }
})
</script>
<style scoped>

</style>