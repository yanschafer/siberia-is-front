<template>
  <MDBContainer
    :class="{ animate__fadeIn: isVisible, animate__fadeOut: !isVisible }"
    class="animate__animated animate__faster d-flex flex-column justify-center align-items-center modal-bg"
    fluid
  >
    <MDBContainer
      @click.stop
      class="animate__animated modal-body d-flex flex-column align-items-center justify-content-center w-100"
      :class="{
        animate__fadeInUp: isVisible,
        animate__fadeOutDown: !isVisible,
      }"
    >
      <img
        class="animate__animated animate__headShake animate__delay-1s utility-icon"
        src="../../../assets/icons/danger.svg"
      />
      <h3 class="modal-heading">{{ title }}</h3>
      <p class="modal-text mb-0">
        {{ text }} <span class="disclaimer">{{ disclaimer }}</span>
      </p>
      <MDBRow class="d-flex flex-row gap-5 mt-3">
        <MDBBtn @click="close" class="utility-btn btn-black">{{
          localize("cancelCapslock")
        }}</MDBBtn>
        <MDBBtn @click="closeAndApprove" class="utility-btn btn-danger">{{
          localize("deleteCapslock")
        }}</MDBBtn>
      </MDBRow>
    </MDBContainer>
  </MDBContainer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import { useModalStore } from "@/stores/modal.store";
import PrintUtil from "@/utils/localization/print.util";

export default defineComponent({
  name: "ModalComponent",
  components: { MDBCol, MDBRow, MDBContainer, MDBBtn },
  emits: ["close", "approved"],
  data: () => ({
    store: useModalStore(),
  }),
  computed: {
    isVisible() {
      return this.store.getIsVisible;
    },
    title() {
      return this.store.title;
    },
    text() {
      return this.store.text;
    },
    disclaimer() {
      return this.store.disclaimer;
    },
  },
  methods: {
    localize(key, module = "default") {
      return PrintUtil.localize(key, module);
    },
    close() {
      this.store.hide();
      this.$emit("close");
    },
    closeAndApprove() {
      this.store.hide();
      this.$emit("approved");
    },
  },
});
</script>

<style scoped>
.modal-bg {
  z-index: 999999999999999;
  background-color: rgba(255, 255, 255, 0.42);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
}
.modal-body {
  width: 100%;
  height: min-content;
  max-width: 500px;
  max-height: 60vh;
  border-radius: 29px;
  border: 2px solid #eee;
  background: #fff;
  padding: 3rem;
  box-shadow: 0px 4px 28.3px 4px rgba(0, 0, 0, 0.06);
}
.utility-icon {
  width: 100%;
  max-width: 8rem;
}
.modal-text {
  text-align: center;
}
.disclaimer {
  text-align: center;
  font-weight: 600;
  width: 100%;
}
.modal-heading {
  font-weight: 800;
  color: black;
}
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: fit-content;
  font-weight: 800;
  max-height: 3rem;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 7px;
}
</style>
