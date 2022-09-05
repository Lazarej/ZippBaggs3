<template>
  <Wrapper>
    <div class="commande-page">
        <div class="head">
          <h2 class="head-title">Commande</h2>
        </div>
        <div class="commande-cont">
           <div class="no-commande">
               
           </div>
        </div>
    </div>
  </Wrapper>
</template>

<script setup>
import Wrapper from "../../../components/global/wrapper.vue";
import { storeToRefs } from "pinia";
import { userStore } from "../../../store/user";


const store = userStore();
const { user } = storeToRefs(store);


onBeforeMount(()=>{
  if(store.user.login === false || store.user.login === undefined){
    return navigateTo({ path: '/auth' })
  }
})

onMounted(async () => {
  await store.loadUserInstance();
   

});


</script>

<style scoped>

.commande-page{
   height: 100%;
   width: 100%; 
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 15%;
  align-items: flex-end;
  border-bottom: solid 1px var(--secondary);
  padding-bottom: 40px;
}

.head p {
  font-family: "Monument";
  text-transform: uppercase;
  font-size: 16px;
  color: var(--text);
}

.commande-cont{
   
}

</style>