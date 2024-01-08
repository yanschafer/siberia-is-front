<template>
  <section>
    <MDBContainer class="animate__animated animate__fadeIn d-flex flex-column justify-content-center align-content-center align-items-center form-container">
        <img class="logo" src="@/assets/Logo.svg" alt="Company logo"/>
        <form class="d-flex flex-column w-85" @submit.prevent="login">
          <!-- Email input -->
          <MDBInput
              class="form-control custom-input"
              type="text"
              label="Email address"
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

        <p class="animate__animated animate__fadeIn error-text" v-if="error !== ''">{{ error }}</p>
      </MDBContainer>
  </section>
</template>

<script lang="ts">
import {MDBContainer, MDBInput, MDBBtn} from "mdb-vue-ui-kit";
import { useRouter } from 'vue-router';
import PrintUtil from "@/utils/localization/print.util";
import AuthModel from "@/api/modules/auth/models/auth.model";
import AuthInputDto from "@/api/modules/auth/dto/login/auth-input.dto";
import Router from "@/router";


export default {
  components: {
    MDBContainer, MDBInput, MDBBtn
  },
  data: () => ({
    username: "",
    password: "",
    error: "",
    router: Router
  }),
  created() {
    this.router = useRouter()
  },
  methods: {
    async login() {
      try {
        if (this.username === "" || this.password === "") {
         this.error = await PrintUtil.localize("error_empty_fields", "auth")
         return
        }
        const authModel = new AuthModel()
        const res = await authModel.auth(new AuthInputDto(
          this.username, this.password
        ))
        if (res.success) {
          this.router.replace({ name: "dashboard" })
        } else {
          this.error = await PrintUtil.localize("bad_credentials", "auth");
        }
      } catch (e) {
        console.error('Auth error:', e);
        this.error = await PrintUtil.localize("something_wrong");
      }
    }
  }
}
</script>

<!--<script setup lang="ts">-->
<!--import { MDBContainer, MDBInput, MDBBtn } from "mdb-vue-ui-kit";-->
<!--import { ref } from 'vue';-->
<!--import { useRoute, useRouter } from 'vue-router';-->
<!--import AuthModel from "@/api/modules/auth/models/auth.model";-->
<!--import AuthInputDto from "@/api/modules/auth/dto/login/auth-input.dto";-->
<!--import UserModel from "@/api/modules/user/models/user.model";-->

<!--const username = ref('');-->
<!--const password = ref('');-->
<!--const error = ref('');-->

<!--const router = useRouter();-->
<!--const route = useRoute();-->

<!--const authModel = new AuthModel();-->
<!--const userModel = new UserModel();-->

<!--const login = async () => {-->
<!--  try {-->
<!--    const response = await authModel.auth(new AuthInputDto(username.value, password.value));-->

<!--    if (response.success) {-->
<!--      const tokenPair = response.getData();-->
<!--      const authorized = await authModel.getAuthorized();-->

<!--      if (authorized.success) {-->
<!--        const currentUser = authorized.getData();-->
<!--        console.log(currentUser);-->

<!--        await router.replace({ name: 'dashboard' });-->
<!--      } else {-->
<!--        error.value = 'Failed to get authorized user data';-->
<!--      }-->
<!--    } else {-->
<!--      error.value = 'Invalid username or password. Please check your credentials.';-->
<!--    }-->
<!--  } catch (e) {-->
<!--    console.error('Auth error:', e);-->
<!--    error.value = 'Something went wrong. Please, contact administrator';-->
<!--  }-->
<!--};-->
<!--</script>-->

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
  border: 1px solid #EEE;
  background: #FCFCFC;
  box-shadow: 0 15px 33px 11px rgba(0, 0, 0, 0.05);
  gap: 3rem;
}
.error-text {
  max-width: 30rem;
  text-align: center;
  font-size: 14px;
  color: #D23939;
}
</style>
