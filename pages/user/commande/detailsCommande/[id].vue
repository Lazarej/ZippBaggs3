<template>
  <div>
    <Wrapper>
      <div class="details-header">
        <div class="back-status-cont">
          <nuxt-link to="/user/commande">
            <div class="back"></div>
          </nuxt-link>
          <div class="status">{{ details.status }}</div>
        </div>
        <div class="status-prog">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80px"
            height="80px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 256 256"
          >
            <path
              fill="#3f8f52"
              d="M226.5 72.7a12.7 12.7 0 0 0-4.5-4.4l-88-49.6a12.4 12.4 0 0 0-11.8 0l-88 49.5a12.7 12.7 0 0 0-4.5 4.4a12.5 12.5 0 0 0-1.6 6v98.6a12.2 12.2 0 0 0 6.1 10.5l88 49.5a11.5 11.5 0 0 0 5.6 1.5h.6a13.7 13.7 0 0 0 5.6-1.5l88-49.5a11.9 11.9 0 0 0 6.1-10.5V78.7a12.5 12.5 0 0 0-1.6-6Zm-100.3-47a4.1 4.1 0 0 1 1.9-.5a4.6 4.6 0 0 1 2 .5L216 74l-38.7 22l-89-49Zm2.8 97.7L40.3 74l39.8-22.4l89 49.1Zm-90.8 57.4a3.9 3.9 0 0 1-2.1-3.5V80.8l88.9 49.5l-.8 98.9Zm179.9 0l-85.9 48.3l.8-98.8l40.1-22.7v44.9a4 4 0 0 0 8 0V103l39-22.1v96.4a4 4 0 0 1-2 3.5Z"
            />
          </svg>
          <div
            class="line"
            :style="
              details.status === 'En Livraison' || details.status === 'livré'
                ? { background: '#3f8f52' }
                : { background: '#c7cec5' }
            "
          ></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80px"
            height="80px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
          >
            <path
              :style="
                details.status === 'En Livraison' || details.status === 'Livré'
                  ? { fill: '#3f8f52' }
                  : { fill: '#c7cec5' }
              "
              d="M4 16h12v2H4zm-2-5h10v2H2z"
            />
            <path
              :style="
                details.status === 'En Livraison' || details.status === 'Livré'
                  ? { fill: '#3f8f52' }
                  : { fill: '#c7cec5' }
              "
              d="m29.919 16.606l-3-7A.999.999 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A3.992 3.992 0 0 0 19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a.997.997 0 0 0-.081-.394ZM9 26a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2Zm14-15h2.34l2.144 5H23Zm0 15a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2Zm5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5Z"
            />
          </svg>
          <div
            :style="
              details.status === 'Livré'
                ? { background: '#3f8f52' }
                : { background: '#c7cec5' }
            "
            class="line"
          ></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70px"
            height="70px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <g
              :style="
                details.status === 'Livré'
                  ? { fill: '#3f8f52' }
                  : { fill: '#c7cec5' }
              "
              fill-rule="evenodd"
            >
              <path
                d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
              />
              <path
                d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207L1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
              />
            </g>
          </svg>
        </div>
      </div>

      <div class="details-body">
        <div class="details-text-cont">
          <h4>Details</h4>
          <p>Numéro de commande : {{ details.uid }}</p>
          <p>Statut : {{ details.status }}</p>
          <p>Montant total : {{ details.total }} €</p>
          <p>Nombre de produits : {{ produits.length }}</p>
        </div>
        <div class="produits-cont">
          <div class="blur"></div>
          <div class="row-prod" v-for="(produit, i) in produits" :key="i">
          <nuxt-link class="link" tag="a" :to="`/produits/${produit.attributes.slug}`">
            <div
              class="img"
              :style="{
                background: `url('http://localhost:1337${produit.attributes.images.data[0].attributes.url}') center /cover no-repeat`,
              }"
            ></div>
            <div class="product-details">
              <h4>{{produit.attributes.name}}</h4>
              <p>{{produit.attributes.price}} €</p>
            </div>
          </nuxt-link>
          </div>
        </div>
      </div>
    </Wrapper>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { userStore } from "../../../../store/user";
import Wrapper from "~~/components/global/wrapper.vue";

const route = useRoute();
const store = userStore();
const { user } = storeToRefs(store);
const details = ref({});
const produits = ref([]);

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
  const fetchData = await fetch(
    `http://localhost:1337/api/commandes/${route.params.id}?populate[produits][populate]=images`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.user.token}`,
      },
    }
  );
  const json = await fetchData.json();
  console.log(json)
  details.value = json.data.attributes;
  produits.value = details.value.produits.data;
}
</script>

<style lang="css" scoped>
.details-header {
  width: 100%;
  display: flex;
  height: 30%;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  border-bottom: solid 1px var(--secondary);
  padding-bottom: 40px;
}

.back-status-cont {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.back {
  height: 30px;
  width: 30px;
  background: url("../../../../assets/svg/detailsBack.svg") center center / 45px
    454px no-repeat;
}

.status {
  font-family: "RobotoC";
  text-transform: uppercase;
  color: var(--title) !important;
  text-align: bottom;
  font-size: 18px;
  line-height: 50px;
}

.status-prog {
  width: 500px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.line {
  height: 2px;
  width: 70px;
  background: beige;
  margin: 0px 20px 0 20px;
}

.details-body {
  margin-top: 60px;
  width: 100%;
  display: flex;
  height: 40%;
}

.details-text-cont {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.details-text-cont h4 {
  font-family: "Lektorat";
  font-size: 40px;
  margin: 0px 0 60px 0;
  text-transform: uppercase;
  letter-spacing: -0.035em;
}

.details-text-cont p {
  font-family: "RobotoC";
  font-size: 18px;
  color: var(--text);
  margin: 3px 0 3px 0;
  letter-spacing: -0.035em;
}

.produits-cont {
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
  direction: rtl;
}


.link{
  display: flex;
}


.img {
  height: 150px;
  width: 110px;

}
.row-prod {
  direction: ltr;
  display: flex;
  margin: 0 0 15px 15px;
}

.product-details{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  
}

.product-details h4 {
  margin-top: 0;
    margin-bottom: 20px;
    line-height: 90%;
    font-family: "Nimbus";
    text-transform: uppercase;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: -0.035em;
    color: var(--title);
}

.product-details p{
  font-family: "RobotoC";
  letter-spacing: -1px;
  line-height: 17px;
  color: var(--text);
}
</style>