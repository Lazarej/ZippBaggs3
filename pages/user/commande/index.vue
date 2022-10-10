<template>
  <Wrapper>
    <div class="commande-page">
      <Header :title="'Mes commandes'"></Header>
      <div class="commande-cont">
        <div v-if="commandes.length === 0" class="no-commande">
          <p>Aucune commandes</p>
        </div>
        <div v-else class="commandes-list">
          <div class="row-commande" v-for="(commande, i) in commandes" :key="i">
            <div class="commande">
              <div class="info-cont">
                <div class="part-left-row">
                  <div
                    class="img"
                    :style="{
                      background: `url('http://localhost:1337${commande.produits[0].images[0].url}') center /cover no-repeat`,
                    }"
                  ></div>
                  <div class="info">
                    <div>
                      <h4>{{ commande.produits[0].name }}</h4>
                      <p class="price">{{ commande.total }} €</p>
                      <p class="adresse">{{ store.user.adresse }}</p>
                      <p class="date">{{ commande.createdAt }}</p>
                    </div>
                    <p class="status">{{ commande.status }}</p>
                  </div>
                </div>
                <div class="part-right-row">
                  <p class="commande-lenght">({{commande.produits.length}})</p>
                  <nuxt-link  :to="`/user/commande/detailsCommande/${commande.id}`">
                    <div class="details">
                      <p>détails</p>
                      <div class="svg"></div>
                    </div>
                  </nuxt-link>

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
import Header from "~~/components/global/header.vue";

const store = userStore();
const { user } = storeToRefs(store);
const commandes = ref([]);

onBeforeMount(() => {
  store.loadUserInstance();
  if (store.user.login === false || store.user.login === undefined) {
    return navigateTo({ path: "/auth" });
  } else {
  }
});

onMounted(() => {
getCommande();

});

const getCommande = async()=>{
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
  commandes.value = response.commandes;
}
</script>

<style scoped>
.commande-page {
  height: 100%;
  width: 100%;
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
  display: flex;
  
}

.part-left-row {
  display: flex;
}

.info-cont {
  height: 100%;
  width: 100%;
  margin-left: 30px;
  display: flex;
  justify-content: space-between;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 30px;
}

.info h4 {
  margin-top: 0;
  margin-bottom: 20px;
  line-height: 90%;
  font-family: "Nimbus";
  text-transform: uppercase;
  font-size: 25px;
  text-transform: uppercase;
  letter-spacing: -0.035em;
  color: var(--title);
}

.price p {
  font-size: 14px;
  font-family: "Roboto";
}

.price {
  margin-bottom: 15px;
}
.info p {
  font-family: "RobotoC";
  letter-spacing: -1px;
  line-height: 17px;
  color: var(--text);
}

.status {
  text-transform: uppercase;
  color: var(--title) !important;
  text-align: bottom;
  font-size: 18px;
}

.img {
  height: 100%;
  width: calc(100px + 4vw);
}
.part-right-row {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.commande-lenght{
  font-family: "Monument";
  color: var(--title);
}

.details{
   text-transform: uppercase;
   font-family: 'RobotoC';
   line-height: 20px;
   letter-spacing: -1px;
   font-size: 18px;
   color: var(--primary);
   display: flex;
   transition: 0.3s;
}
.details p{
  transition: 0.3s;
}
.details:hover p{
 margin-right: 10px;
}

.svg{
  width: 20px;
  background: url("../../../assets/svg/arrow.svg") center center / 28px
    28px no-repeat;
  cursor: pointer;
}
</style>
