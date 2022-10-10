<template>
  <section class="meilleurs-vente">
    <h2>Nos meilleurs ventes</h2>
    <div class="best-product-cont">
      <div class="best-product">
        <Card v-for="(bestProduct,id) in bestProducts" :key="id" :height="'80%'" :width="'300px'" :margin="'0 0.6% 0px 0.6%'"
          :link="`/produits/${bestProduct.attributes.slug}`"
          :image="`url(http://localhost:1337${bestProduct.attributes.images.data[0].attributes.url}) center /cover no-repeat`"
          :name="bestProduct.attributes.name" :price="bestProduct.attributes.price"></Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Card from '../global/card.vue';

let bestProducts = ref([]);

const props =  defineProps({
       products: Object,
       test: Object
  })

onMounted( () => {
  bestProduct();
})

const bestProduct = () => {
    
    const ascending =  props.products.data.sort((a, b) => {
      return b.attributes.sold - a.attributes.sold
    })
    bestProducts.value = ascending.splice(0, 5);

}


</script>

<style lang="css" scoped>
.meilleurs-vente {
  height: 100vh;
  width: 93%;
  padding: 0% 0px 0px 7%;
}

.meilleurs-vente h2 {
  margin-bottom: 80px;
  margin-top: 50px;
}

.best-product-cont {
  display: flex;
  height: 500px;
  width: 100%;
}

.best-product {
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  display: flex;
  scroll-behavior: smooth;
}

.best-product::-webkit-scrollbar {
  height: 3px;
}

.best-product::-webkit-scrollbar-track {
  margin-right: 30px;
}

.best-product-card {
  display: flex;
  margin-right: 10px;
  flex-direction: column;
  height: 90%;
  min-width: 300px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 90%;
  transition: 0.3s;

}

.best-product-card:hover .card-image {
  transform: scale(1.05);

}

.card-info {
  height: 60px;
  width: 100%;
  position: relative;
  background-color: #fefffe;
}

.card-info p:nth-child(1) {
  font-size: 18px;
  font-weight: 400;
}

.card-info p:nth-child(2) {
  margin-top: 5px;
}

.card-info p {
  margin-top: 10px;
  font-family: "Roboto";
}

@media (min-width: 500px) {

  .meilleurs-vente {
    margin-bottom: 20vh;
  }

  .meilleurs-vente h2 {
    font-size: 64px;
    margin-bottom: 80px;
    margin-top: 80px;
  }

  .best-product-cont {
    height: 550px;
  }

  .best-product-card {
    min-width: 350px;
  }

  .best-product::-webkit-scrollbar {
    height: 5px;
  }

  .best-product::-webkit-scrollbar-track {
    margin-right: 7vw;

  }

}
</style>
