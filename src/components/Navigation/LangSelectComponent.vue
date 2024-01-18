<script lang="ts">
import {defineComponent} from 'vue'
import {MDBBtn, MDBCol, MDBRow} from "mdb-vue-ui-kit";

export default defineComponent({
  name: "LangSelectComponent",
  components: {MDBBtn, MDBCol, MDBRow}
})
</script>

<template>
  <MDBRow class="w-100 d-flex justify-content-between">
    <MDBCol class="col-auto p-0">
      <MDBBtn
          v-tooltip.right="{
        value: 'Switch to english',
        pt: {
            arrow: {
              style: {
                borderRightColor: 'black'
              }
            },
            text: {
              style: {
                fontSize: '12px',
                padding: '0.3rem',
                background: 'black',
              }
            }
        }
    }"

          class="active clear-btn">
        <img class="flag" alt="Country flag" src="@/assets/icons/flags/eng.svg" />
      </MDBBtn>
    </MDBCol>
    <MDBCol class="col-auto p-0">
      <MDBBtn
          v-tooltip.right="{
        value: 'Cambiar a español',
        pt: {
            arrow: {
              style: {
                borderRightColor: 'black'
              }
            },
            text: {
              style: {
                fontSize: '12px',
                padding: '0.3rem',
                background: 'black',
              }
            }
        }
    }"
          class="clear-btn">
        <img class="flag" alt="Country flag" src="@/assets/icons/flags/es.svg" />
      </MDBBtn>
    </MDBCol>
    <MDBCol class="col-auto p-0">
      <MDBBtn v-tooltip.right="{
        value: 'Переключить на русский',
        pt: {
            arrow: {
              style: {
                borderRightColor: 'black'
              }
            },
            text: {
              style: {
                fontSize: '12px',
                padding: '0.3rem',
                background: 'black',
              }
            }
        }
    }"
          class="clear-btn">
        <img class="flag" alt="Country flag" src="@/assets/icons/flags/ru.svg" />
      </MDBBtn>
    </MDBCol>
  </MDBRow>
</template>

<style scoped>
.clear-btn {
  padding: 0!important;
  filter: grayscale(1);
  transition: all 0.3s ease-in-out;
}
.clear-btn:hover {
  filter: grayscale(0);
}
.active {
  filter: grayscale(0);
}
.flag {
  width: 20px;
}
:deep(.p-tooltip-text) {
  font-size: 12px!important;
}
:deep(.p-tooltip) {
  padding: 0!important;
}
</style>