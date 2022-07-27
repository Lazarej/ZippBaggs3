<template>
  <div class="search-wrapper">
    <form @submit.prevent="submit">
    <input type="text" v-model="searchText" />
    </form>
    
    <p>{{ searchText }}</p>
    <div class="result-cont">
      <button @click="filter">click</button>
    </div>
    <div v-for="(produit, id) in produits" :key="id">
      <p>{{ }}</p>
    </div>
  </div>
</template>

<script>
 
export default {
  setup() {
    const searchText = ref("");
    const produits = ref([])
    const URL = 'http://localhost:1337/api/produits/'

    async function filter(searchText) {
     const grabData = await fetch(URL + searchText.value +'?populate=*');
     
     const json = await grabData.json();
     console.log(grabData)
     produits.value = json.data.attributes;
     console.log(produits)
     
    }

    async function submit(){
        if(!searchText.value)return;

        filter(searchText)
    }

    return{filter,searchText,produits,URL,submit}
  },
};
</script>

<style lang="css" scoped>
.search-wrapper {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: #fff;
}
</style>
