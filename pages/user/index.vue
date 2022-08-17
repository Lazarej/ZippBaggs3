<template>
  <Wrapper>
    <div v-if="user.login === true" class="account-page">
      <p>{{user.username}}</p>
    </div>
  </Wrapper>
</template>

<script setup lang="ts">
import Wrapper from "../../components/global/wrapper.vue";
import { storeToRefs } from "pinia";
import { userStore } from "../../store/user";

const store = userStore();
const { user } = storeToRefs(store);
const login = ref(false);
const test = ref({});

const validation = ref({
  error: false,
  errorMessages: [],
});

const formLog = ref({
  email: "",
  password: "",
});

const formCreate = ref({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  repeatPassword: "",
  address:""
});

onMounted(async () => {
  await store.loadUserInstance();
  test.value = await user;
  console.log(user);
});

const getError = (index) => {
  return validation.value.errorMessages.find((e) => {
    return e.index === index;
  });
};

const validate = () => {
  if (login.value == true) {
    if (formLog.value.email.length < 1) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "email",
        message: "Veuillez saisir un email",
      });
    }
    if (formLog.value.password.length < 1) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "password",
        message: "Veuillez saisir un mot de passe",
      });
    }
  } else {
    if (formCreate.value.firstname.length < 1) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "firstname",
        message: "Veuillez saisir un nom",
      });
    }
    if (
      (formCreate.value.password === formCreate.value.repeatPassword &&
        formCreate.value.password.length > 5) === false
    ) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "passwordRepeat",
        message: "Les mots de passe ne correspondent pas",
      });
    }
    if (formCreate.value.lastname.length < 1) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "lastname",
        message: "Veuillez saisir un prénom",
      });
    }
    if (formCreate.value.email.length < 1) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "email",
        message: "Veuillez saisir un email",
      });
    }
       if(formCreate.value.address.length < 1) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "address",
        message: "Les mots de passe ne correspondent pas",
      });
    }
  }
};

const send = async () => {
  validate();
  if (login.value == true) {
    if (validation.value.error === false) {
   
      store.login(formLog.value.email, formLog.value.password);
    }
  } else {
    if (validation.value.error === false) {
   
      store.create(formCreate.value)
    }
  }
};


</script>

<style lang="css" scoped>
.auth-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
}

.input-cont {
  display: flex;
  flex-direction: column;
}
</style>
