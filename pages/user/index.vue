<template>
  <Wrapper>
    <div class="auth-page">
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
      </form>

      <form class="form form-create" v-else action="">
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
          <label for="email">Email</label>
          <input
            id="email"
            placeholder="Email"
            type="email"
            v-model="formCreate.email"
          />
          <small v-if="validation.error && getError('email') !== undefined">{{
            getError("email").message
          }}</small>
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
            v-if="validation.error && getError('repeatPassword') !== undefined"
            >{{ getError("repeatPassword").message }}</small
          >
        </div>
      </form>

      <div>
        <p>
          <span @click="login = true">Login</span> |
          <span @click="login = false">Create</span>
        </p>
      </div>
      <div>
        <button @click="send">Send</button>
      </div>
    </div>
  </Wrapper>
</template>

<script>
import Wrapper from "../../components/global/wrapper.vue";

export default {
  components: { Wrapper },

  setup() {
    const login = ref(false);

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
      }
    };

    const send = async () => {
      validate();
      if (login.value == true) {
        if (validation.value.error === false) {
          console.log("go2");
          const body = {
            identifier: formLog.value.email,
            password: formLog.value.password,
          }
           try {
          const data = await fetch("http://localhost:1337/api/auth/local", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(body),
          })
          
          .then((response) => {
            console.log(response.json());
          });
        } catch (error) {
          console.error(error.response);
        }
          
        }
       
      } else {
        if (validation.value.error === false) {
          console.log("go");
          const body = {
            username:
              formCreate.value.firstname + " " + formCreate.value.lastname,
            email: formCreate.value.email,
            password: formCreate.value.password,
          };
          console.log(body);
          try {
            const data = await fetch(
              "http://localhost:1337/api/auth/local/register?populate=*",
              {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(body),
              }
            ).then((response) => {
              console.log(response.json);
            });
          } catch (error) {
            console.error(error);
          }
        }
      }
    };

    return { formLog, login, formCreate, send, validate, validation, getError };
  },
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
