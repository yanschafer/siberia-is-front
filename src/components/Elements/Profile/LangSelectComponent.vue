<template>
  <MDBRow class="w-100 d-flex">
    <MDBCol v-if="selectedLang !== 'eng'" class="col-auto p-0">
      <MDBBtn
        v-tooltip.left="{
          value: 'Switch to english',
          pt: {
            arrow: {
              style: {
                borderRightColor: 'black',
              },
            },
            text: {
              style: {
                fontSize: '12px',
                padding: '0.3rem',
                background: 'black',
              },
            },
          },
        }"
        :class="{ active: selectedLang === 'eng', disabled: isCountdownActive }"
        class="clear-btn"
        @click="switchLang('eng')"
      >
        <img
          class="flag"
          alt="Country flag"
          src="@/assets/icons/flags/eng.svg"
        />
      </MDBBtn>
    </MDBCol>
    <MDBCol v-if="selectedLang !== 'es'" class="col-auto p-0">
      <MDBBtn
        v-tooltip.left="{
          value: 'Cambiar a español',
          pt: {
            arrow: {
              style: {
                borderRightColor: 'black',
              },
            },
            text: {
              style: {
                fontSize: '12px',
                padding: '0.3rem',
                background: 'black',
              },
            },
          },
        }"
        :class="{ active: selectedLang === 'es', disabled: isCountdownActive }"
        class="clear-btn"
        @click="switchLang('es')"
      >
        <img
          class="flag"
          alt="Country flag"
          src="@/assets/icons/flags/es.svg"
        />
      </MDBBtn>
    </MDBCol>
    <MDBCol v-if="selectedLang !== 'ru'" class="col-auto p-0">
      <MDBBtn
        v-tooltip.left="{
          value: 'Переключить на русский',
          pt: {
            arrow: {
              style: {
                borderRightColor: 'black',
              },
            },
            text: {
              style: {
                fontSize: '12px',
                padding: '0.3rem',
                background: 'black',
              },
            },
          },
        }"
        :class="{ active: selectedLang === 'ru', disabled: isCountdownActive }"
        class="clear-btn"
        @click="switchLang('ru')"
      >
        <img
          class="flag"
          alt="Country flag"
          src="@/assets/icons/flags/ru.svg"
        />
      </MDBBtn>
    </MDBCol>
  </MDBRow>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MDBBtn, MDBCol, MDBRow } from "mdb-vue-ui-kit";
import PrintUtil from "@/utils/localization/print.util";

export default defineComponent({
  name: "LangSelectComponent",
  components: { MDBBtn, MDBCol, MDBRow },
  data() {
    return {
      selectedLang: PrintUtil.getSelectedLang(),
      isCountdownActive: false,
      countdown: 5,
    };
  },
  methods: {
    localize(key, module = "components") {
      return PrintUtil.localize(key, module);
    },
    showSuccessToast() {
      this.$toast.add({
        severity: "success",
        summary: this.localize("langChangeHeading"),
        detail: this.localize("langChangeDetail"),
        life: 3000,
      });
    },
    switchLang(locale: string) {
      PrintUtil.switchTo(locale);
      this.selectedLang = locale;

      this.isCountdownActive = true;
      this.showSuccessToast();
      setTimeout(() => {
        location.reload();
      }, 2500);
    },
  },
});
</script>
<style scoped>
.clear-btn {
  padding: 0 !important;
  filter: grayscale(1);
  opacity: 0.2;
  transition: all 0.3s ease-in-out;
}
.clear-btn:hover {
  filter: grayscale(0);
  opacity: 1;
}
.active {
  filter: grayscale(0);
  opacity: 1;
  transition: all 0.3s ease-in-out;
}
.flag {
  width: 20px;
}
:deep(.p-tooltip-text) {
  font-size: 12px !important;
}
:deep(.p-tooltip) {
  padding: 0 !important;
}
</style>
