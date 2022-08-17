<template>
  <Wrapper>
    <div class="head">
      <h2>Mon compte</h2>
      <p>{{ user.username }}</p>
    </div>
    <div class="option-cont">
      <nuxt-link tag="a" to="/user/commande">
        <div class="option">
          <div class="svg-cont">
            <div class="svg"></div>
          </div>
          <div class="text-cont">
            <p class="text-cont-title">Suivit de commande</p>
            <p class="text-cont-text">
              Voir l’historique de vos commandes et suivre celles en cours
            </p>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link tag="a" to="">
        <div class="option">
          <div class="svg-cont">
            <div class="svg"></div>
          </div>
          <div class="text-cont">
            <p class="text-cont-title">Information personelle</p>
            <p class="text-cont-text">
              Mettez a jour vos informations personelles
            </p>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link tag="a" to="">
        <div class="option">
          <div class="svg-cont">
            <div class="svg"></div>
          </div>
          <div class="text-cont">
            <p class="text-cont-title">conditions d'utilisation</p>
            <p class="text-cont-text">Nos conditions d’utilisation</p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </Wrapper>
</template>

<script setup lang="ts">
import Wrapper from "../../components/global/wrapper.vue";
import { storeToRefs } from "pinia";
import { userStore } from "../../store/user";

const store = userStore();
const { user } = storeToRefs(store);

onMounted(async () => {
  await store.loadUserInstance();
  console.log(user);
});
</script>

<style lang="css" scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 15%;
  align-items: flex-end;
  border-bottom: solid 1px var(--secondary);
  padding-bottom: 40px;
}

.head p {
  font-family: "Monument";
  text-transform: uppercase;
  font-size: 16px;
  color: var(--text);
}

.option-cont {
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.option {
  height: 310px;
  width: 330px;
  padding: 20px;
}

.svg-cont {
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
}

a{
  color: var(--title);
}

 a:nth-child(1)  .option .svg-cont .svg {
  background: url("../../../assets/svg/package.svg") center center / 80px 80px
    no-repeat;
  height: 90px;
  width: 90px;
}
 a:nth-child(2)  .option .svg-cont .svg {
  background: url("../../../assets/svg/finger.svg") center center / 80px 80px
    no-repeat;
  height: 90px;
  width: 90px;
}
 a:nth-child(3)  .option .svg-cont .svg {
  background: url("../../../assets/svg/contract.svg") center center / 80px 80px
    no-repeat;
  height: 90px;
  width: 90px;
}

.text-cont {
  text-align: center;
}
.text-cont-title {
  font-size: 20px;
  margin-bottom: 20px;
  line-height: 90%;
  font-family: "Nimbus";
  text-transform: uppercase;
  letter-spacing: -0.035em;
  font-weight: bold;
}

.text-cont-text {
  font-family: "Montserrat";
  font-size: 14px;
  letter-spacing: -1px;
  line-height: 17px;
  color: var(--text);
}
</style>
