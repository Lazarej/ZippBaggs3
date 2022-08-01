<template>
  <div class="cart-page">
   <button @click="test">Yes</button>
   <div v-for="(item,index)  in displayCart" :key="index">
   <div>{{item.name}}</div>
  
   
   
   </div>

  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useCartStore } from '../../store/cart'
export default {

    setup(){
        const store = useCartStore()
        const {cart, displayCart} =  storeToRefs(store)

        onMounted(()=>{
          store.loadCartInstance()
          store.displayCartLoad()
        })

        const test = () =>{
          console.log(displayCart)
        }


        return{store,test}

    }

}
</script>

<style lang="css" scoped>

.cart-page{
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>