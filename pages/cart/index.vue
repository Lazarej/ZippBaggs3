<template>
  <Wrapper>
    <div class="header-cart-page">
      <h2>Panier</h2>

      <span class="count">({{ displayCart.length }})</span>
    </div>
    <div class="cart-cont">
      <div class="slider-cont">
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
              <div class="multi-select">
                <select
                  class="select"
                  name="quantity"
                  id="quantity"
                  v-model="item.qty"
                  @change="changeCount(item)"
                >
                  <option v-if="item.reste > 1" :value="1">1</option>
                  <option v-if="item.reste > 10" :value="10">10</option>
                  <option v-if="item.reste > 20" :value="20">20</option>
                  <option v-if="item.reste > 40" :value="40">40</option>
                  <option v-if="item.reste > 100" :value="100">100</option>
                </select>
              </div>
              <p>{{ item.price * item.qty }} EUR</p>
              <p class="delete-btn" @click="removeItem(item.id, productData)">
                Supprimer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total-buy">
      <div class="btn-total">
        <p>
          total: <span> {{ total2 }} EUR</span>
        </p>
        <button >Achetez</button>
      </div>
    </div>
  </Wrapper>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "../../store/cart";
import { DisplayCart } from "../../types/interfaces";
import Wrapper from "../../components/global/wrapper.vue";
import { userStore } from "../../store/user";
const store = useCartStore();
const storeU = userStore();
const { cart, displayCart } = storeToRefs(store);
const path = useRoute().path;
const total2 = ref(0);

computed(() => {
  let sum = displayCart.value.forEach((item) => {
    total2.value = total2.value + item.price * item.qty;
  });
  return sum;
});

const { data: grabData } = await useFetch(
  "http://localhost:1337/api/produits/?populate=*"
);
const productData = grabData.value.data;

onMounted(async () => {
  store.loadCartInstance();
  store.displayCartLoad(productData);
  storeU.loadUserInstance()
  displayCart.value.forEach((item) => {
    total2.value = total2.value + item.price * item.qty;
  });
});

const changeCount = (item) => {
  store.addToCart({ id: item.id, qty: item.qty }, path);
};

const buy = async () => {
      const data = await fetch("http://localhost:1337/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        method: "POST",
      });

  
}

const removeItem = (id: number, productData) => {
  console.log(id);
  console.log(productData);
  store.removeFromCart(id, productData);
};
</script>

<style lang="css" scoped>
.header-cart-page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 15%;
  align-items: flex-end;
}

.header-cart-page h2 {
  font-size: 50px;
  line-height: 90%;
}

.header-cart-page .count {
  font-family: "Monument";
  color: var(--title);
}

.cart-cont {
  display: flex;
  height: 75%;
  align-items: flex-end;
  overflow: hidden;
  overflow-x: scroll;
  margin-bottom: 20px;
}

.cart-cont::-webkit-scrollbar {
  height: 3px;
}

.slider-cont {
  display: flex;
  height: 85%;
}
.card {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 90%;
  margin-right: 40px;
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

.multi-select {
  margin-bottom: 50px;
  width: 80px;
}

.select {
  width: 80px;
  height: 40px;
  border: 1px solid #c7cec5;
  outline: none;
}

.select:focus-visible {
  width: 80px;
  height: 40px;
  border: 1px solid #c7cec5;
  outline: none;
}

.select option {
  width: 80px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border: none;
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
</style>
