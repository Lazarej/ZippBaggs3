<template>
  <Wrapper>
    <PopUp :stepForgot="stepForgot"></PopUp>
    <div class="auth-cont">
      <div class="auth-page">
        <div>
          <h2 v-if="login === true" class="title-auth">Connexion</h2>
          <h2 v-else class="title-auth">S'incrire</h2>
        </div>
        <form class="form form-login" v-if="login" action="">
          <div class="input-cont">
            <label>Email</label>
            <input type="email" v-model="formLog.email" />
            <small v-if="validation.error && getError('email') !== undefined">{{
              getError("email").message
            }}</small>
          </div>
          <div class="input-cont">
            <label>Mot de passe</label>
            <input type="password" v-model="formLog.password" />
            <small
              v-if="validation.error && getError('password') !== undefined"
              >{{ getError("password").message }}</small
            >
          </div>
          <p>si vous avez oublié votre mot de passe <span @click="(stepForgot.active = true) && (stepForgot.step1 = true)">cliquez ici</span></p>
        </form>

        <form class="form form-create" v-else action="">
          <div class="column-form">
            <div class="input-cont">
              <label for="firstname">Prénom</label>
              <input
                placeholder="prénom"
                id="firstname"
                type="text"
                v-model="formCreate.firstname"
              />
              <small
                v-if="validation.error && getError('firstname') !== undefined"
                >{{ getError("firstname").message }}</small
              >
            </div>

            <div class="input-cont">
              <label for="email">Email</label>
              <input
                id="email"
                placeholder="Email"
                type="email"
                v-model="formCreate.email"
              />
              <small
                v-if="validation.error && getError('email') !== undefined"
                >{{ getError("email").message }}</small
              >
            </div>
            <div class="input-cont">
              <label for="password">Mot de passe</label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                v-model="formCreate.password"
              />
              <small
                v-if="validation.error && getError('password') !== undefined"
                >{{ getError("password").message }}</small
              >
            </div>
            <div class="input-cont">
              <label for="repeatPassword">Répéter le mot de passe</label>
              <input
                id="repeatPassword"
                placeholder="Repeter le mot de passe"
                type="password"
                v-model="formCreate.repeatPassword"
              />
              <small
                v-if="
                  validation.error && getError('repeatPassword') !== undefined
                "
                >{{ getError("repeatPassword").message }}</small
              >
            </div>
          </div>
          <div class="column-form">
            <div class="input-cont">
              <label for="lastname">Nom</label>
              <input
                placeholder="Nom"
                id="lastname"
                type="text"
                v-model="formCreate.lastname"
              />

              <small
                v-if="validation.error && getError('lastname') !== undefined"
                >{{ getError("lastname").message }}</small
              >
            </div>
            <div class="input-cont">
              <label for="adresse">Adresse</label>
              <input
                placeholder="adresse"
                id="adresse"
                type="text"
                v-model="formCreate.adresse"
              />

              <small
                v-if="validation.error && getError('adresse') !== undefined"
                >{{ getError("adresse").message }}</small
              >
            </div>
          </div>
        </form>

        <button v-if="login === true" class="btn" @click="send">
          Connectez Vous
        </button>
        <button v-else class="btn" @click="send">Inscrivez vous</button>
      </div>
      <div v-if="login === true" class="changer">
        <h4>Crée un compte</h4>
        <p>
          Si vous n'avez pas encore de compte vous devez vous inscrire pour avec
          accès a nos produits
        </p>
        <button class="btn" @click="login = false">Crée un compte</button>
      </div>
      <div v-else class="changer">
        <h4>Se connecter</h4>
        <p>
          Si vous avez deja un compte connecter vous pour pouvoir achetez nos
          produits
        </p>
        <button class="btn" @click="login = true">Se connecter</button>
      </div>
    </div>
  </Wrapper>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { userStore } from "../../store/user";
import Wrapper from "../../components/global/wrapper.vue";
import PopUp from "~~/components/auth/popUp.vue";

const router = useRouter();
const route = useRoute();
const store = userStore();
const { user } = storeToRefs(store);
const login = ref(true);
 const stepForgot = ref({
  active:false,
  step1: false,
  step2:false,
  step3: false
 })
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
  adresse: "",
});

onMounted( () => {

  route.query.code !== undefined ? (stepForgot.value.step2 = true) && (stepForgot.value.active = true) : null
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
    if (formCreate.value.adresse.length < 1) {
      validation.value.error = true;
      validation.value.errorMessages.push({
        index: "adresse",
        message: "Ecrivez une adresse",
      });
    }
  }
};

const send =  () => {
  validate();
  if (login.value == true) {
    if (validation.value.error === false) {
      store.login(formLog.value.email, formLog.value.password);
      
    }
  } else {
    if (validation.value.error === false) {
      store.create(formCreate.value);
      
    }
  }
};
</script>

<style lang="css" scoped>
.auth-cont {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.auth-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.title-auth {
  margin: 10vh 0 5vh 0;
  font-size: 50px;
}

.form {
  display: flex;
  width: 300px;
  flex-direction: column;
  margin-bottom: 40px;
}

.form-login p{
  font-family: "Montserrat";
    font-size: 14px;
    letter-spacing: -1px;
    line-height: 17px;
    color: var(--text);
}

.form-login p span{
  font-weight: 800;
  color:var(--title) ;
  margin: 0 5px 0 5px;
}
.form-create {
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

.changer {
  display: flex;
  flex-direction: column;
  margin: 24vh 13vw 0 0;
  width: 350px;
}
.changer h4 {
  font-size: 24px;
  margin-bottom: 20px;
  line-height: 90%;
  font-family: "Nimbus";
  color: var(--title);
  text-transform: uppercase;
}
.changer p {
  font-family: "Montserrat";
  font-size: 14px;
  letter-spacing: -1px;
  line-height: 17px;
  color: var(--text);
  margin-bottom: 30px;
}
.btn {
  max-width: 350px;
  height: 50px;
  font-size: 15px;
  border-color: var(--title);
  font-family: "Roboto";
  text-transform: uppercase;
  background: var(--background);
}

.close {
  width: 30px;
  height: 30px;
  background: url("../../assets/svg/close.svg") center center / 30px;
  margin-right: 30px;
}

</style>
