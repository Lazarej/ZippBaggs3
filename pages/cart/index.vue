<template>
  <div class="cart-page">
    <div class="card" v-for="(item, index) in displayCart" :key="index">
      <div
        class="image"
        :style="{
          background: `url(http://localhost:1337${item.image}) center /cover no-repeat`,
        }"
      ></div>
      <div>{{ item.name }}</div>
      <button @click="removeItem(item.id,productData)">delete</button>
      <div v-if="item.inStock">y'en a encore {{item.reste}} et vous en avez {{item.qty}} en stock? {{item.inStock}}</div>
      <div v-else> Merde y'en a plus </div>
       <div>total: {{total}}</div>

    </div>
   
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "../../store/cart";
import {DisplayCart} from  '../../types/interfaces'

const store = useCartStore();
const { cart, displayCart } = storeToRefs(store);

const { data: grabData } = await useFetch(
  "http://localhost:1337/api/produits/?populate=*"
);
const productData = grabData.value.data;
onMounted(async () => {
  store.loadCartInstance();
  store.displayCartLoad(productData);

  console.log(total)

});

const total = computed(()=>{
     var sum =  displayCart.value.forEach((el)=> el.qty * el.price )
     console.log(sum)
})



const removeItem = (id:number,productData) =>{
  console.log(id)
  console.log(productData)
   store.removeFromCart(id,productData)
   
}
</script>

<style lang="css" scoped>
.card{
  display: flex;
  flex-direction: column
  
}
.image {
  width: 300px;
  height: 400px;
}
.cart-page {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
