<template>
  <div class="oui">{{produit.name}}
  </div>
</template>

<script>
export default {
    setup() {
    const route = useRoute();

    const produit = ref([])

    const name = route.params.slug

   onMounted(async () =>{
    console.log('mounted')
    const fetchData = await fetch(
      `http://localhost:1337/api/produits/${route.params.slug}?populate=*`
     
    );

    const json = await fetchData.json()
    produit.value = json.data.attributes
    console.log(produit.value.name)
   })
     

    return { produit,name };
  },
};
</script>

<style lang="css" scoped>
.oui {
  font-size: 180px;
}
</style>