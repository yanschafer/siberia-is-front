<template>
  <section>
    <MDBContainer
      class="animate__animated animate__fadeIn d-flex flex-column justify-content-center align-content-center align-items-center form-container"
    >
      <img class="logo" src="@/assets/Logo.svg" alt="Company logo" />
      <form class="d-flex flex-column w-85" @submit.prevent="login">
        <!-- Email input -->
        <MDBInput
          class="form-control custom-input"
          type="text"
          label="Login"
          id="loginEmail"
          v-model="username"
          wrapperClass="input mb-4"
        />
        <!-- Password input -->
        <MDBInput
          type="password"
          label="Password"
          id="loginPassword"
          v-model="password"
          wrapperClass="mb-4"
        />

        <MDBBtn type="submit" color="black" block> Log in </MDBBtn>
      </form>

      <p
        class="animate__animated animate__fadeIn error-text"
        v-if="error !== ''"
      >
        {{ error }}
      </p>
    </MDBContainer>
  </section>
</template>

<script lang="ts">
import { MDBContainer, MDBInput, MDBBtn } from "mdb-vue-ui-kit";
import { useRouter } from "vue-router";
import PrintUtil from "@/utils/localization/print.util";
import AuthModel from "@/api/modules/auth/models/auth.model";
import AuthInputDto from "@/api/modules/auth/dto/login/auth-input.dto";
import Router from "@/router";
import ApiModelUtil from "@/utils/api-model.util";
import { useAuthCheckStore } from "@/stores/auth-check.store";

export default {
  components: {
    MDBContainer,
    MDBInput,
    MDBBtn,
  },
  data: () => ({
    username: "",
    password: "",
    error: "",
    router: Router,
  }),
  created() {
    this.router = useRouter();
  },
  methods: {
    async login() {
      try {
        if (this.username === "" || this.password === "") {
          this.error = await PrintUtil.localize("error_empty_fields", "auth");
          return;
        }
        const authModel = new AuthModel();
        const res = await authModel.auth(
          new AuthInputDto(this.username, this.password),
        );
        if (res.success) {
          new ApiModelUtil("").initSockets(this.$toast);
          useAuthCheckStore().refresh();
          this.router.replace({ name: "dashboard" });
        } else {
          this.error = await PrintUtil.localize("bad_credentials", "auth");
        }
      } catch (e) {
        console.error("Auth error:", e);
        this.error = await PrintUtil.localize("something_wrong");
      }
    },
  },
};
</script>

<style scoped>
.logo {
  width: 100%;
  max-width: 120px;
}
section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-container {
  width: auto;
  min-width: 40vw;
  padding: 3rem;
  border-radius: 17px;
  border: 1px solid #eee;
  background: #fcfcfc;
  box-shadow: 0 15px 33px 11px rgba(0, 0, 0, 0.05);
  gap: 3rem;
}
.error-text {
  max-width: 30rem;
  text-align: center;
  font-size: 14px;
  color: #d23939;
}
</style>
