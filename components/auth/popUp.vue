<template>
  <div v-if="stepForgot.active" class="pop-up-forgot-password">
    <div class="pop-up">
      <div class="close-cont">
        <div @click="close" class="close"></div>
      </div>
      <form v-if="stepForgot.step1" action="">
        <h4>etape 1</h4>
        <p>indiquer votre email dans le champ ci dessous</p>
        <div class="input-cont">
          <label>Email</label>
          <input type="email" v-model="formReset.email" />
          <p v-if="!stepForgot.step2Complete" class="step-complete">{{message}}</p>
        </div>
      </form>
      <p v-if="stepForgot.step1Complete" class="step-complete">{{message}}</p>
      <form v-if="stepForgot.step2" action="">
        <h4>etape 2</h4>
        <p>indiquer votre nouveau mot de passe ci dessous</p>
        <div class="input-cont">
          <label>Mot de passe</label>
          <input type="password" v-model="formReset.newPassword" />
        </div>
        <div class="input-cont">
          <label>repeter le mot de passe</label>
          <input type="password" v-model="formReset.newPasswordRepeat" />
          <p v-if="!stepForgot.step2Complete" class="step-complete">{{message}}</p>
        </div>
      </form>
      <p v-if="stepForgot.step2Complete" class="step-complete">{{message}}</p>
      <button v-if="stepForgot.step1 || stepForgot.step2" class="btn" @click="reset">Envoyer</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const props = defineProps({
  stepForgot: { type: Object },
});

const formReset = ref({
  email: "",
  newPassword: "",
  newPasswordRepeat: "",
});

const message = ref('');

const close = () => {
  props.stepForgot.active = false;
};

const reset = async () => {
  if (props.stepForgot.step1 === true) {
    try {
      const data = await fetch("http://localhost:1337/api/auth/forgot-password", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: formReset.value.email }),
      });
      if(data.ok){
      props.stepForgot.step1 = false
      props.stepForgot.step1Complete = true
      message.value = 'Nous vous avons envoyer un email'
      }else{
        message.value = 'Votre email est invalide'
      }
     
    } catch (error) {
      console.error(error);
    }
  }
  if (props.stepForgot.step2 === true) {
    try {
      const data = await fetch("http://localhost:1337/api/auth/reset-password", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          code: route.query.code,
          password: formReset.value.newPassword,
          passwordConfirmation: formReset.value.newPasswordRepeat,
        }),
      });
      if(data.ok){
      props.stepForgot.step2 = false
      props.stepForgot.step2Complete = true
      message.value = 'Votre mot de passe est changé'
      }else{
        message.value = 'Votre mot de passe est invalide'
      }
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.pop-up-forgot-password {
  height: 100vh;
  width: 100vw;
  z-index: 100;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(223, 223, 223, 0.815);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pop-up {
  position: relative;
  height: 400px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  background: var(--background);
}

.pop-up form {
  padding: 40px;
}

.pop-up h4 {
  font-size: 24px;
  margin-bottom: 20px;
  line-height: 90%;
  font-family: "Nimbus";
  color: var(--title);
  text-transform: uppercase;
}

.pop-up p {
  font-family: "Montserrat";
  font-size: 14px;
  letter-spacing: -1px;
  line-height: 17px;
  color: var(--text);
  margin-bottom: 30px;
}

.pop-up .input-cont {
  background: var(--background);
}

.pop-up .btn {
  width: 300px;
  font-size: 14px;
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

.btn {
  max-width: 350px;
  height: 50px;
  font-size: 15px;
  border-color: var(--title);
  font-family: "Roboto";
  text-transform: uppercase;
  background: var(--background);
}

.close-cont {
  position: absolute;
  left: 5px;
  top: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.close {
  width: 30px;
  height: 30px;
  background: url("../../assets/svg/close.svg") center center / 30px;
  margin-right: 30px;
}
</style>