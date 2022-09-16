<template>
  <div class="search-wrapper">
    <form @submit.prevent="submit">
      <input
        class="search-bar"
        type="text"
        v-model="searchText"
        placeholder="Rechercher"
      />
    </form>
    <div class="filtered-scroll-cont">
      <div class="filtered-content-cont">
        <p class="filtered-message">{{ message }}</p>
       
        <card  v-for="(filter, id) in filters" :key="id" :link="`/produits/${filter.attributes.slug}`" :image="`url(http://localhost:1337${filter.attributes.images.data[0].attributes.url}) center /cover no-repeat`"
        :name="filter.attributes.name" :price="filter.attributes.price"></card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '~~/components/global/card.vue';
export default {
    setup() {
        const searchText = ref("");
        const produits = ref([]);
        const filters = ref([]);
        const test = ref("test");
        const message = ref("");
        const URL = "http://localhost:1337/api/produits?filters[slug][$contains]=";
        watch(() => searchText.value, async (old, notOld) => {
            if (searchText.value.length !== 0) {
                const grabData = await fetch(URL + searchText.value + "&populate=images");
                const json = await grabData.json();
                filters.value = json.data;
                console.log(filters.value);
                if (filters.value.length === 0) {
                    message.value = "Aucun produit trouvé";
                }
                else {
                    message.value = "";
                }
            }
            else {
                filters.value = [];
            }
        });
        return { filters, searchText, produits, URL, test, message };
    },
    components: { Card }
};
</script>

<style lang="css" scoped>
.search-wrapper {
  position: fixed;
  padding: 15vh 6vw 0 6vw;
  height: 80vh;
  width: 88vw;
  background: #fff;
}

.search-bar {
  outline: none;
  height: 30px;
  font-family: "LektoratL";
  width: 100%;
  border: 0px solid grey;
  border-bottom: black 1px solid;
  font-size: 20px;
  text-transform: uppercase;
  line-height: -50px;
}

.filtered-scroll-cont {
  position: relative;
  width: 100%;
  height: 85%;
  overflow: hidden;
  overflow-y: scroll;
  direction: rtl;
  margin-top: 5%;
  display: flex;
  justify-content: center;
}

.filtered-message {
  position: absolute;
  left: 50%;
  top: 30%;
  font-family: "LektoratL";
  font-size: 30px;
  text-transform: uppercase;

  color: #c7cec5;
  transform: translate(-50%, -50%);
}

.filtered-scroll-cont::-webkit-scrollbar{
  width: 3px;
}

.filtered-scroll-cont::-webkit-scrollbar-track {
  background: transparent;
}
.filtered-content-cont {
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  direction: ltr;
}

.card-produit {
  width: calc(100% / 5);
  margin: 0 2.6% 30px 2.6%;
  height: calc(10px + 25vw);
}

.card-image-cont{
  height: 90%;
  width: 100%;
  overflow: hidden;
}

.card-image-cont:hover .card-image{
  transform: scale(1.05);
}
.card-image {
  height: 100%;
  width: 100%;
  transition: 0.5s ease-out;
}

.card-image a {
  text-decoration:none;
}

.info-card{
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  font-family: 'LektoratL';
  text-transform: uppercase;
  color: #2C2C29;
}

.card-produit:nth-of-type(4n + 1) {
  margin-left: 3.2%;
}

.card-produit:nth-of-type(4n) {
  margin-right: 0;
}
</style>
