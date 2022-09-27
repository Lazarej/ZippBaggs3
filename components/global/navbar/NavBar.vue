<template>
  <div class="nav-bar">
    <div class="nav-bar-header">
      <div class="nav-aligner">
        <div
          class="burger-container"
          :class="{ 'nav-active-2': navActive }"
          @click="toggle"
        >
          <span
            class="burger-line line-1"
            :class="{ 'nav-active-3': navActive }"
          ></span>
          <span
            class="burger-line line-2"
            :class="{ 'nav-active-4': navActive }"
          ></span>
          <span
            class="burger-line line-3"
            :class="{ 'nav-active-5': navActive }"
          ></span>
        </div>
      </div>
      <div class="nav-title-container">
        <nuxt-link tag="a" to="/">
          <h2 class="nav-title">ZippBaggs</h2>
        </nuxt-link>
      </div>
      <div class="svg-container">
        <nuxt-link to="/search">
          <div class="nav-svg search"></div>
        </nuxt-link>
        <nuxt-link v-if="user.login === true" to="/user">
          <div class="nav-svg account"></div>
        </nuxt-link>
        <nuxt-link v-else to="/auth">
          <div class="nav-svg account"></div>
        </nuxt-link>
        <nuxt-link to="/cart">
          <div class="nav-svg bagg"></div>
        </nuxt-link>
        <p v-if="user.login === true" @click="logout" class="logout">déconnexion</p>
      </div>
    </div>
    <div class="nav-bar-under" :class="{ 'nav-active-1': navActive }">
      <div class="under-content-container">
        <div class="column-container">
          <div
            class="nav-categories-colum"
            v-for="(categorie, id) in categories"
            :key="id"
            @mouseenter="showCategorieImg(categorie)"
            @mouseleave="hiddenCategorieImg"
          >
            <nuxt-link :to="`/categories/${categorie.id}`"><h4>{{ categorie.attributes.name }}</h4></nuxt-link>
            <nuxt-link
              class="nav-link"
              :to="`/produits/${produit.attributes.slug}`"
              v-for="(produit, id) in categorie.attributes.produits.data"
              :key="id"
            >
              <p>{{ produit.attributes.name }}</p>
            </nuxt-link>
          </div>
        </div>
        <div class="image-nav-slide-cont">
          <div
            class="img-categorie"
            v-if="showImage"
            :style="{
              background: `url('http://localhost:1337${imageBack}') center /cover no-repeat`,
            }"
          ></div>
          <div class="nav-slide" :class="{ active: showSlide }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "../../../store/user";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = userStore();
const { user } = storeToRefs(store);
const navActive = ref(false);
const showImage = ref(false);
const showSlide = ref(false);
const imageBack = ref(false);
const delayTransition = ref(300);
const categories = ref([]);


const { data: grabData } = await useFetch(
  "http://localhost:1337/api/produits/?populate=*"
);
const productData = grabData.value.data;

onMounted(async () => {
  await store.loadUserInstance();
  const { data: response } = await useFetch(
    "http://localhost:1337/api/categories?populate=*"
  );
  categories.value = response._rawValue.data; 
});

function toggle() {
  navActive.value = !navActive.value;
  console.log(navActive.value);
  showImage.value = false;
}

const logout = () => {
  store.logout(productData);
  router.push({ path: '/' })
};

const  hiddenCategorieImg = () => {
  console.log(showImage.value);
  showSlide.value = false;
  setTimeout(() => {
    showImage.value = false;
  }, 300);
}

 const showCategorieImg = (categorie) => {
  if (categorie.attributes.image !== "undefined") {
    setTimeout(() => {
      imageBack.value = categorie.attributes.image.data.attributes.url;
      showImage.value = true;
      showSlide.value = true;
    }, 300);
  }
}
</script>

<style lang="css" scoped>
.nav-bar {
  position: fixed;
  display: flex;
  z-index: 5;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 10vh;
  background-color: #fefffe;
}

.nav-bar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
}

.nav-aligner {
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
}

.burger-container {
  margin-left: 30px;
  position: relative;
  height: 30px;
  width: 40px;
}

.burger-container:hover .burger-line {
  background: #3f8f51;
  cursor: pointer;
}

.burger-line {
  position: absolute;
  display: block;
  height: 4px;
  width: 40px;
  background: #2c2c29;
  top: 50%;
  transform: translateY(-40%);
  transition: 0.3s;
}

.nav-active-3 {
  transform-origin: left;
  width: 0;
}
.line-2 {
  transform: translateY(-11px);
  transition-delay: 0.3s;
  transition: 0.3s;
}

.nav-active-4 {
  transform: rotate(45deg);
  transition: 0.3s;
}
.line-3 {
  transform: translateY(8px);
  transition-delay: 0.3s;
  transition: 0.3s;
}

.nav-active-5 {
  transform: rotate(-45deg);
}

.nav-title {
  font-family: "Monument";
  font-weight: 400;
  font-size: 30px;
}

.svg-container {
  margin-right: 30px;
  width: fit-content;
  height: 50%;
  display: flex;
}

.nav-svg {
  height: 50px;
  width: 50px;
  margin: 0 5px 0 0px;
}

.search {
  background: url("../../../assets/svg/search.svg") center center / 28px 28px
    no-repeat;
  transition: 0.3s;
}

.search:hover {
  background: url("../../../assets/svg/searchHover.svg") center center / 28px
    28px no-repeat;
  cursor: pointer;
}

.account {
  background: url("../../../assets/svg/account.svg") center center / 28px 28px
    no-repeat;
  transition: 0.3s;
}

.account:hover {
  background: url("../../../assets/svg/accountHover.svg") center center / 28px
    28px no-repeat;
  cursor: pointer;
}

.logout {
  font-size: 16px;
  font-family: "Roboto";
  text-transform: uppercase;
  letter-spacing: -0.2px;
  margin-top: 22px;
}

.bagg {
  background: url("../../../assets/svg/bagg.svg") center center / 28px 28px
    no-repeat;
  transition: 0.3s;
}

.bagg:hover {
  background: url("../../../assets/svg/baggHover.svg") center center / 28px 28px
    no-repeat;
  cursor: pointer;
}

.nav-bar-under {
  overflow: hidden;
  height: 0;
  width: 100%;
  transition: 0.5s ease;
  transform-origin: bottom;
  border-bottom: 0.5px solid #eaedea;
}

.nav-active-1 {
  height: 420px;
}

.under-content-container {
  display: flex;
  justify-content: space-between;
  margin: 60px 60px 30px 80px;
}

.column-container {
  display: flex;
}

.nav-categories-colum {
  display: flex;
  flex-direction: column;
  padding-right: 100px;
  height: auto;
}

.nav-categories-colum h4 {
  font-family: "Roboto";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 30px;
}

.nav-link {
  width: max-content;
  position: relative;
  font-family: "RobotoC";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 15px;
  text-decoration: none;
  transition: 0.3s;
}

.nav-link p:after {
  content: "";
  position: absolute;
  height: 1.5px;
  width: 100%;
  background-color: var(--title);
  left: 0;
  top: 120%;
  transform: scaleX(0);
  transition: transform 0.4s;
  transform-origin: left;
}

.nav-link:hover {
  color: var(--title);
}

.nav-link p:hover:after {
  transform: scaleX(1);
}

.image-nav-slide-cont {
  position: relative;
  height: 300px;
  width: 400px;
}
.img-categorie,
.nav-slide {
  background-color: #fefffe;
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: left;
  width: 100%;
  height: 100%;
  transition: 0.5s;
}

.active {
  width: 0%;
}

.slide-enter-active,
.slide-leave-active {
  transition: width 0.3s;
}
.slide-enter,
.slide-leave-to {
  width: 100%;
}
</style>
