<template>
  <section>
    <MDBContainer class="animate__animated animate__fadeIn d-flex flex-column justify-content-center align-content-center align-items-center form-container">
        <img class="logo" src="@/assets/Logo.svg" alt="Company logo"/>
        <form class="d-flex flex-column w-85" @submit.prevent="login">
          <!-- Email input -->
          <MDBInput
              class="form-control custom-input"
              type="email"
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

        <p class="animate__animated animate__fadeIn error-text" v-if="error">{{ error }}</p>
      </MDBContainer>
  </section>
</template>

<script setup lang="ts">
import {MDBContainer, MDBInput, MDBBtn} from "mdb-vue-ui-kit";
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const error = ref('');

const router = useRouter();
const route = useRoute();

const login = async () => {
  try {
    // Ваша временная логика аутентификации (без реального бекенда)
    if (username.value === 'test' && password.value === 'password') {
      // Временный "вход" без реального бекенда
      // Мы перенаправляем пользователя на DashboardView
      await router.push('/dashboard');
    } else {
      error.value = 'This combination of login/password doesn’t exist. Please, check info provided or contact with your administrator.';
    }
  } catch (e) {
    console.error('Auth error:', e);
    error.value = 'Something went wrong. Please, contact administrator';
  }
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
  border: 1px solid #EEE;
  background: #FCFCFC;
  box-shadow: 0px 15px 33px 11px rgba(0, 0, 0, 0.05);
  gap: 3rem;
}
.error-text {
  max-width: 30rem;
  text-align: center;
  font-size: 14px;
  color: #D23939;
}
</style>
