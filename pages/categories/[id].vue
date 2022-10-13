<template>
  <Wrapper>
    <div class="cat-header">
      <h2>{{ categorie.name }}</h2>
      <h2>{{ categorie.name }}</h2>
    </div>
    <div class="cat-body">
      <div class="filter-row">
        <div class="multi-select">
          <select
            class="select"
            name="select"
            id="select"
            @change="price($event)"
          >
            <option :value="'Aucun'">Aucun</option>
            <option :value="'Croissant'">Prix Croissant</option>
            <option :value="'Decroissant'">Prix Decroissant</option>
          </select>
        </div>
        <div class="multi-select">
          <select
            class="select"
            name="color"
            id="color"
            @change="colors($event)"
          >
            <option :value="'Aucun'">Aucun</option>
            <option :value="'Red'">Rouge</option>
            <option :value="'Blue'">Bleu</option>
            <option :value="'Black'">Noir</option>
            <option :value="'Yellow'">Jaune</option>
            <option :value="'Brown'">Marron</option>
            <option :value="'Orange'">Orange</option>
            <option :value="'Green'">Vert</option>
            <option :value="'Grey'">Gris</option>
            <option :value="'White'">Blanc</option>
            <option :value="'Purple'">Violet</option>
          </select>
        </div>
      </div>
      <div class="card-cont">
        <div v-if="produits.length === 0" class="no-prod">
            <p>Aucun produits</p>
        </div>
        <Card v-else
          v-for="(produit, i) in produits"
          :key="i"
          :link="`/produits/${produit.attributes.slug}`"
          :image="`url(http://localhost:1337${produit.attributes.images.data[0].attributes.url}) center /cover no-repeat`"
          :name="produit.attributes.name"
          :price="produit.attributes.price"
        ></Card>
      </div>
    </div>
  </Wrapper>
</template>

<script lang="ts" setup>
import Wrapper from "~~/components/global/wrapper.vue";
import { storeToRefs } from "pinia";
import { userStore } from "../../store/user";
import Card from "~~/components/global/card.vue";

const cD = ref('Prix')
const route = useRoute();
const store = userStore();
const { user } = storeToRefs(store);
const categorie = ref({});
const produits = ref([]);
const test = ref(false)

let saveArr = [];

onMounted(() => {
 getData();
});

const getData = async()=>{
  const fetchData = await fetch(
    `http://localhost:1337/api/categories/${route.params.id}?populate[produits][populate]=images`
  );
  const json = await fetchData.json();
  categorie.value = json.data.attributes;
  produits.value = categorie.value.produits.data;
}


const colors = (event) => {
  saveArr.length === 0
    ? (saveArr = produits.value)
    : (produits.value = saveArr);

  event.target.value === "Aucun"
    ? (produits.value = saveArr)
    : (produits.value = produits.value.filter(
        (e) => e.attributes.Colors === event.target.value
      ));
};

const price = (event) => {

  if (event.target.value === "Croissant") {
    produits.value.sort((a, b) => {
      return a.attributes.price - b.attributes.price;
    });
  }

  if (event.target.value === "Decroissant") {
    produits.value.sort((a, b) => {
      return b.attributes.price - a.attributes.price;
    });
  } if (event.target.value === "Aucun"){ 
    produits.value.sort((a, b) => {
      return a.id - b.id;
    });
  }
};
</script>

<style lang="css" scoped>
.cat-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  position: relative;
  height: 20%;
}

.cat-header h2 {
  position: absolute;
  font-family: "MonumentB";
  font-style: normal;
  font-weight: 800;
  font-size: 96px;
  line-height: 115px;
  -webkit-text-stroke: 1px var(--title);
  color: #fff;
}

.cat-header h2:nth-child(1) {
  top: 10%;
}

.cat-header h2:nth-child(2) {
  top: 20%;
}

.cat-body {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.filter-row {
  height: 50px;
  width: 100%;
  margin-left: 45px;
  display: flex;
  margin-bottom: 20px;
}

.multi-select {
  margin-bottom: 50px;
  margin-right: 20px;
}

.select {
  height: 40px;
  border: 1px solid var(--secondary);
  outline: none;
}

.select:focus-visible {
  height: 40px;
  border: 1px solid var(--secondary);
  outline: none;
}

.select option {
  display: flex;
  align-items: center;
  padding-left: 5px;
  border: none;
}

.color {
  height: 50px;
  width: 50px;
  border-radius: 15px;
  border: solid 0.5px black;
}

.card-cont {
  position: relative;
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-wrap: wrap;
}

.no-prod{
  position: absolute;
  left: 50%;
  top: 30%;
  font-family: "LektoratL";
  font-size: 30px;
  text-transform: uppercase;
  color: #c7cec5;
  transform: translate(-50%, -50%);
}

@media (max-width: 600px) {
  .cat-header h2{
    font-size: 58px;
  }

  .cat-header h2:nth-child(2){
    top: 15%;
  }

  .filter-row{
    margin-left: 3.2%;
  }
}
</style>