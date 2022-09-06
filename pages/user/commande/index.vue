<template>
  <Wrapper>
    <div class="commande-page">
      <div class="head">
        <h2 class="head-title">Commande</h2>
      </div>
      <div class="commande-cont">
        <div v-if="commandes.length === 0" class="no-commande">
          <p>Aucune commandes</p>
        </div>
        <div v-else class="commandes-list">
          <div class="row-commande" v-for="(commande, i) in commandes" :key="i">
            <div class="commande">
              <div class="info-cont">
                <div
                  class="img"
                  :style="{
                    background: `url('http://localhost:1337${commande.produits[0].images[0].url}') center /cover no-repeat`,
                  }"
                ></div>
                <div class="info">
                  <h4>{{commande.produits[0].name}}</h4>
                  <p class="price">{{commande.total}} €</p>
                  <p class="adresse">{{store.user.adresse}}</p>
                  <p class="date">{{commande.createdAt}}</p>
                  <p class="status">{{commande.status}}</p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
</template>

<script setup>
import Wrapper from "../../../components/global/wrapper.vue";
import { storeToRefs } from "pinia";
import { userStore } from "../../../store/user";

const store = userStore();
const { user } = storeToRefs(store);
const commandes = ref([]);

onBeforeMount(async () => {
  store.loadUserInstance();
  if (store.user.login === false || store.user.login === undefined) {
    return navigateTo({ path: "/auth" });
  } else {
  }
});

onMounted(async () => {
  const data = await fetch(
    "http://localhost:1337/api/users/me?populate[commandes][populate][produits][populate]=images",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.user.token}`,
      },
      method: "GET",
    }
  );

  const response = await data.json();
  console.log(store.user);
  commandes.value = response.commandes;

  console.log(commandes.value[0].produits[0].images[0].url, "commandes");
});
</script>

<style scoped>
.commande-page {
  height: 100%;
  width: 100%;
}

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

.commande-cont {
  width: 100%;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.no-commande {
  position: absolute;
  left: 50%;
  top: 30%;
  font-family: "LektoratL";
  font-size: 30px;
  text-transform: uppercase;
  color: #c7cec5;
  transform: translate(-50%, -50%);
}

.row-commande {
  height: calc(100px + 7vw);
  width: 100%;
  padding: 30px 0 30px 0;
  border-bottom: solid 1px var(--secondary);
}

.commande {
  height: 100%;
}

.info-cont {
  height: 100%;
  margin-left: 30px;
  display: flex;
  
}

.info{
  flex-direction: column;
  margin-left: 30px;
}

.info h4{
  margin-top: 0;
    margin-bottom: 40px;
    line-height: 90%;
    font-family: "Nimbus";
    text-transform: uppercase;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: -0.035em;
    color: var(--title);
}

.price p{
  font-size: 14px;
  font-family: 'Roboto';
}

.price{
  margin-bottom: 15px;
}
.info p{
   
    letter-spacing: -1px;
    line-height: 17px;
    color: var(--text);
}


.img {
  height: 100%;
  width: calc(100px + 4vw);
}
</style>
