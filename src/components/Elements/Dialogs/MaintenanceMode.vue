<template>
  <div class="maintenance-mode container-fluid d-flex">
    <div
      class="container d-flex flex-column justify-content-center align-items-center"
    >
      <IconWorldCog color="#a1a1a1" :size="120" stroke-width="1" />
      <h1>{{ localize("maintenanceHeading", "components") }}</h1>
      <p>{{ localize("maintenanceText", "components") }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import PrintUtil from "@/utils/localization/print.util";
import { IconWorldCog } from "@tabler/icons-vue";

export default {
  name: "MaintenanceMode",
  components: { IconWorldCog },
  methods: {
    localize(key, module = "components") {
      return PrintUtil.localize(key, module);
    },
  },
};
</script>

<style scoped>
.maintenance-mode {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #a1a1a1;
  z-index: 1000;
}
</style>
