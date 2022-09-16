<template>
  <div class="pop-up">
    <div class="close-cont">
      <div @click="close" class="close"></div>
    </div>
    <h4>Panier</h4>
    <div class="card-cont">
      <div class="card" v-for="(item, index) in displayCart" :key="index">
        <div class="title-card-cont">
          <p>{{ item.name }}</p>
        </div>
        <div class="img-info">
          <div
            class="image"
            :style="{
              background: `url(http://localhost:1337${item.image}) center /cover no-repeat`,
            }"
          ></div>
          <div class="info-card-cont">
            <p class="qty">{{ item.qty }}</p>
            <p>{{ item.price * item.qty }} EUR</p>
            <p class="delete-btn" @click="removeItem(item.id, productData)">
              Supprimer
            </p>
          </div>
        </div>
      </div>

    </div>
    <div class="btn-cont">
        <nuxt-link to="/cart"><button class="btn">Aller a votre panier</button></nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DisplayCart } from "../../types/interfaces";
import { storeToRefs } from "pinia";
import { useCartStore } from "../../store/cart";

const store = useCartStore();
const { cart, displayCart } = storeToRefs(store);

const props = defineProps({
  close: Function,
});

const removeItem = (id: number, productData) => {
  store.removeFromCart(id, productData);
};

onMounted(async () => {
  const { data: grabData } = await useFetch(
    "http://localhost:1337/api/produits/?populate=*"
  );
  const productData = grabData.value.data;
  console.log(productData);
  store.loadCartInstance();
  store.displayCartLoad(productData);
  console.log(displayCart.value);
});
</script>

<style scoped>
.pop-up {
  height: 100%;
  position: fixed;
  width: 400px;
  transition: 0.5s;
  right: 0%;
  top: 0;
  z-index: 100;
  background: var(--background);
  border: 0.5px solid #eaedea;
}

.close-cont {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.close {
  width: 30px;
  height: 30px;
  background: url("../../assets/svg/close.svg") center center / 30px;
  margin-right: 30px;
}

.pop-up h4 {
  text-transform: uppercase;
  font-family: "Nimbus";
  font-size: 22px;
  margin: 20px 0 0 40px;
}

.card-cont {
  margin: 40px;
  height: 60%;
  overflow: hidden;
  overflow-y: scroll;
  border-bottom: solid 1px var(--title);
}

.card-cont::-webkit-scrollbar {
  background-color: var(--background);
  width: 0px;
}
.card {
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 280px;
  margin: 20px 0 40px 0;
}

.title-card-cont {
  height: 10%;
  width: 70%;
  display: flex;
  align-items: flex-end;
}

.title-card-cont p {
  font-family: "Nimbus";
  text-transform: uppercase;
  font-size: 20px;
  line-height: 90%;
  margin-bottom: 15px;
  letter-spacing: -0.035em;
}

.img-info {
  display: flex;
  width: 100%;
  height: 90%;
}
.image {
  width: 70%;
  height: 100%;
}

.info-card-cont {
  height: 100%;
  width: 20%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  font-family: "Nimbus";
  color: var(--title);
  font-size: 13px;
  justify-content: space-between;
}

.qty {
  font-size: 14px;
}

.delete-btn {
  font-size: 14px;
  border: none;
  font-family: "Roboto";
  text-transform: uppercase;
}

.total-buy {
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.btn-total {
  display: flex;
}

.btn-total button {
  height: 50px;
  width: 250px;
  font-size: 16px;
  font-family: "Roboto";
  text-transform: uppercase;
}

.btn-total p {
  font-size: 13px;
  margin-right: 20px;
  text-transform: uppercase;
  font-family: "Nimbus";
}

.btn-total p span {
  font-weight: 800;
}

.btn-cont{
    margin:0 40px 0 40px; 
}
.btn{
    width: 100%;
    height: 40px;
    text-transform: uppercase;
    font-family: 'Roboto';
    background: var(--background);

}
</style>