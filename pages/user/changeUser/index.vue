<template>
  <Wrapper>
    <Header :title="'Change tes infos personelle'"></Header>
    <form class="form form-change" action="">
          <div class="column-form">
          
            <div class="input-cont">
              <label for="email">Email</label>
              <input
                id="email"

                type="email"
                v-model="formChange.email"
              />
              <small
                v-if="validation.error && getError('email') !== undefined"
                >{{ getError("email").message }}</small
              >
            </div>
            <div class="input-cont">
              <label for="oldPassword">Mot de passe actuel</label>
              <input
                id="oldPassword"
                placeholder="Password"
                type="password"
                v-model="formChange.oldPassword"
              />
              <small
                v-if="validation.error && getError('oldPassword') !== undefined"
                >{{ getError("oldPassword").message }}</small
              >
            </div>
           
          </div>
          <div class="column-form">
         
            <div class="input-cont">
              <label for="adresse">Adresse</label>
              <input
                id="adresse"
                type="text"
                v-model="formChange.adresse"
              />

              <small
                v-if="validation.error && getError('adresse') !== undefined"
                >{{ getError("adresse").message }}</small
              >
            </div>
            <div class="input-cont">
              <label for="newPassword">Nouveau mot de passe</label>
              <input
                id="newPassword"
                placeholder="Repeter le mot de passe"
                type="password"
                v-model="formChange.newPassword"
              />
              <small
                v-if="
                  validation.error && getError('newPassword') !== undefined
                "
                >{{ getError("newPassword").message }}</small
              >
            </div>
          </div>
        </form>
        <button @click="change"></button>
  </Wrapper>
</template>

<script lang="ts" setup>
import Wrapper from '~~/components/global/wrapper.vue';
import Header from '~~/components/global/header.vue';
import { storeToRefs } from "pinia";
import { userStore } from "../../../store/user";

const store = userStore();
const { user } = storeToRefs(store);
const userData = ref({});

const validation = ref({
  error: false,
  errorMessages: [],
});





onBeforeMount(()=>{
  store.loadUserInstance(); 
  if(store.user.login === false || store.user.login === undefined){
    console.log('non');
    return navigateTo({ path: '/auth' });
  }
});

onMounted(async () => {
  const data = await  fetch(
    "http://localhost:1337/api/users/me?populate[adresse]",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.user.token}`,
      },
      method: "GET",
    }
  );
  const response = await data.json();
  
  userData.value = response;
  formChange.value.email = userData.value.email
  formChange.value.adresse = userData.value.adresse

});

const formChange = ref({

email: "",
oldPassword: "",
newPassword: "",
adresse: "",
});


const getError = (index) => {
  return validation.value.errorMessages.find((e) => {
    return e.index === index;
  });
};

const validate = () => {
  console.log(userData.value)
    if (
      (formChange.value.oldPassword === user.value.password &&
      formChange.value.password.length > 5) === false
    ) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "passwordChange",
        message: "Les mots de passe ne correspondent pas",
      });
    }
  
    if (formChange.value.email.length < 1) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "email",
        message: "Veuillez saisir un email",
      });
    }
    if (formChange.value.adresse.length < 1) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "adresse",
        message: "Ecrivez une adresse",
      });
    }   
};

const change = () => {
  validate();
  store.change(formChange.value)
}

</script>

<style lang="css" scoped>

.form-change {
  display: flex;
  margin-top: 80px;
  flex-direction: row;
  width: auto;
}

.column-form {
  width: 300px;
  margin-right: 40px;
}

.input-cont {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-cont label {
  font-size: 14px;
  margin-bottom: 10px;
  font-family: "Roboto";
  text-transform: uppercase;
  color: var(--title);
}

.input-cont input {
  outline: none;
  height: 20px;
  font-family: "Nimbus";
  width: 100%;
  border: 0px solid grey;
  border-bottom: black 1px solid;
  font-size: 16px;
  line-height: -50px;
}

</style>