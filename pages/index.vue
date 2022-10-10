<template>
  <div >   
    <Presentation/>
    <Selection/>
   <MeilleursVente v-if="load" :products="products" :test="products"/>
   <Footer1 v-if="load" :categories="categories"></Footer1>
  </div>
</template>

<script setup>
import MeilleursVente from '~~/components/homepage/MeilleursVente.vue';
import Selection from '~~/components/homepage/Selection.vue';
import Presentation from '~~/components/homepage/Presentation.vue';
import Footer from '~~/components/homepage/Footer.vue';
import Footer1 from '~~/components/homepage/Footer.vue';


const products = ref({})
const categories = ref([])
let load = ref(false)

onMounted(()=>{
  getData();
  
})

const getData = async() =>{
  try {
    const categoriesResponse = await fetch('http://localhost:1337/api/categories?populate=*', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'GET'
  });
  const productsResponse = await fetch('http://localhost:1337/api/produits?populate=*', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'GET'
  });
  categories.value = await categoriesResponse.json();
  products.value = await productsResponse.json();
  load.value = !load.value;
  } catch (error) {
    console.error(error)
  }
}


</script>

<style>

</style>