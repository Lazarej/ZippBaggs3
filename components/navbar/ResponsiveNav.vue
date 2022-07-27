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
        <h2 class="nav-title">ZippBaggs</h2>
      </div>
      <div class="svg-container">
        <div class="nav-svg search" @click="toggleSearch"></div>
        <div class="nav-svg bagg"></div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="navActiveSearch" class="fade-search">
        <div class="search-container">
          <div class="input-data">
            <input
              type="text"
              placeholder="Chercher"
              class="search-input"
              required
              autocomplete="off"
            />
            <div class="nav-svg search"></div>
          </div>
          <div class="close" @click="toggleSearch">
            <span class="close-span span-1"></span>
            <span class="close-span span-2"></span>
          </div>
        </div>
      </div>
    </transition>
    <div class="nav-bar-under" :class="{ 'nav-active-1': navActive }">
      <div class="under-content-container">
        <div class="close" @click="toggle">
          <span class="close-span span-1"></span>
          <span class="close-span span-2"></span>
        </div>
        <div class="column-container">
          <div class="account-cont">
            <h4>Mon compte</h4>
            <div class="account-svg"></div>

          </div>
          <div
            class="nav-categories-colum"
            @click="toggle3(categorie)"
            v-for="(categorie, id) in Myjson.categories"
            :key="id"
          >
            <h4>{{ categorie.name }}</h4>
            <div class="categorie-next"></div>
          </div>
        </div>
      </div>
      <div class="res-categorie-slide" :class="{ 'nav-active-6': columActive }">
        <div class="padding-slide">
          <div class="back-cont" @click="toggle3">
          <div class="back-svg"></div>
          <p>retour</p>
        </div>
        <div>
          <h2>{{speCategorie.name}}</h2>
        </div>
        <nuxt-link
          class="nav-link"
          to=""
          v-for="(produit, id) in speCategorie.produits"
          :key="id"
        >
          <div class="nav-categories-colum">
            <p>{{ produit.name }}</p>
            <div class="categorie-next"></div>
          </div>
        </nuxt-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../../json/categories.json";
export default {
  name: "ResponsiveNav",

  data() {
    return {
      navActive: false,
      Myjson: json,
      navActiveSearch: false,
      columActive: false,
      speCategorie: {
        name: "Baggs",
        image: "https://picsum.photos/200/300",
        description:
          "Le maires de la ville a élu ce bon vieux Tom comme deputé car il est fin négociateur et aussi peu scupuleux qu'un nazi",
        produits: {
          dragdede: {
            name: "DragonBall",
            image: "https://picsum.photos/400/300",
            description:
              "Idéal pour le bon shit gras qui colle au packson , il est dit dans un tres vieille legende que Bob Marley lui meme a confectionné ce packson a partir de ces propres chevveux",
            prix: "10 C",
            quantitéEnStock: "1000",
          },
          "rick&mortyxzddz ": {
            name: "Rick&Morty",
            image: "https://picsum.photos/400/400",
            description:
              "Idéal pour le bon shit gras qui colle au packson , il est dit dans un tres vieille legende que Bob Marley lui meme a confectionné ce packson a partir de ces propres chevveux",
            prix: "10 C",
            quantitéEnStock: "1000",
          },
          hunterXHunterdzdzd: {
            name: "Hunter X Hunter",
            image: "https://picsum.photos/400/500",
            description:
              "Idéal pour le bon shit gras qui colle au packson , il est dit dans un tres vieille legende que Bob Marley lui meme a confectionné ce packson a partir de ces propres chevveux",
            prix: "10 C",
            quantitéEnStock: "1000",
          },
        },
      },
    };
  },

  methods: {
    toggle() {
      this.navActive = !this.navActive;
    },

    async toggle3(categorie) {
      
      this.speCategorie = categorie;
      this.columActive = !this.columActive;
    },

    toggleSearch() {
      this.navActiveSearch = !this.navActiveSearch;
    },
  },
};
</script>

<style lang="css" scoped>
.nav-bar {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  z-index: 5;
  left: 0;
  width: 100%;
  background-color: #fefffe;
}

.nav-bar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
}

.nav-aligner {
  width: 70px;
  height: 100%;
  display: flex;
  align-items: center;
}

.burger-container {
  margin-left: 15px;
  position: relative;
  height: 30px;
  width: 40px;
}

.burger-line {
  position: absolute;
  display: block;
  height: 3px;
  width: 30px;
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
  transform: translateY(-8px);
  transition-delay: 0.3s;
  transition: 0.3s;
}

.nav-active-4 {
  transform: rotate(45deg);
  transition: 0.3s;
}
.line-3 {
  transform: translateY(4px);
  transition-delay: 0.3s;
  transition: 0.3s;
}

.nav-active-5 {
  transform: rotate(-45deg);
}

.nav-title {
  font-family: "Monument";
  font-weight: 400;
  font-size: 20px;
}

.svg-container {
  margin-right: 15px;
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
}

.nav-svg {
  height: 30px;
  width: 30px;
}

.search {
  background: url("~assets/svg/search.svg") center center / 24px 24px no-repeat;
  transition: 0.3s;
}

.bagg {
  margin-left: 5px;
  background: url("~assets/svg/bagg.svg") center center / 24px 24px no-repeat;
  transition: 0.3s;
}

.bagg:hover {
  background: url("~assets/svg/baggHover.svg") center center / 28px 28px
    no-repeat;
  cursor: pointer;
}

.nav-bar-under {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 50;
  background: #fefffe;
  height: 100vh;
  width: 0%;
  transition: 0.5s ease;
}

.nav-active-1 {
  width: 100%;
}

.under-content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.close {
  margin-left: 20px;
  margin-top: 20px;
  position: relative;
  height: 30px;
  width: 30px;
}

.close-span {
  position: absolute;
  display: block;
  height: 2px;
  width: 25px;
  background: #2c2c29;
  top: 50%;
}

.span-1 {
  transform: rotate(45deg);
}

.span-2 {
  transform: rotate(-45deg);
}

.column-container {
  display: flex;
  width: 89%;
  flex-direction: column;
  margin: 60px 20px 60px 20px;
}

.fade-search {
  height: 100vh;
  width: 89%;
  position: absolute;
  z-index: 5;
  padding: 0px 20px 60px 20px;
  background-color: #fefffe;
  transition: 0.3s;
}

.active {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.search-container {
  display: flex;
  margin-bottom: 60px;
  align-items: flex-end;
}

.search-container .input-data {
  height: 40px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  border-bottom: solid 2px #c7cec5;
}
.search-input {
  height: 70%;
  width: 95%;
  font-size: 17px;
  border: none;
  padding-left: 10px;
  outline: none;
  color: #2c2c29;
  background: white;
  transition: 0.3s;
}
.search-input:focus {
  color: black;
}
.underline2 {
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
  background: black;
}

.input-data .search {
  background: url("~assets/svg/search.svg") center center / 20px 20px no-repeat;
}
.input-data .search-input:focus ~ .input-data,
.input-data .search-input:valid ~ .input-data {
  border-bottom: solid 2px #c50000;
}

.nav-categories-colum {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
}

.column-container h4{
    font-family: "RobotoC";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
}
.account-cont{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #c7cec5;
  border-top: 2px solid #c7cec5;
  margin-bottom: 20px;
}


.account-svg {
  height: 40px;
  width: 40px;
  background: url("~assets/svg/account.svg") right center / 26px 26px no-repeat;
  transition: 0.3s;
}

.categorie-next {
  height: 100%;
  width: 50px;
  background: url("~assets/svg/arrow.svg") 30px center / 28px 28px no-repeat;
}

.res-categorie-slide {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 7;
  background-color: #fefffe;
  overflow: hidden;
  height: 100vh;
  width: 0%;
  transition: 0.5s ease;
  transform-origin: left;
}

.padding-slide{
  height: 100%;
  width: 90%;
  padding: 20px;
}

.nav-active-6 {
  width: 100vw;
}

.back-cont{
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

.back-cont p{
  font-size: 22px;
  text-transform: uppercase;
  font-family: "RobotoC";
}

.padding-slide h2{
  margin-bottom: 30px;
}

.back-svg{
  transform: rotate(-180deg);
  height: 34px;
  width: 24px;
  background: url("~assets/svg/arrowBlack.svg") 0px center/ 34px 34px no-repeat;
}

.nav-link {
  width: max-content;
  position: relative;
  font-family: "RobotoC";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  color: #626262;
  margin-bottom: 15px;
  text-decoration: none;
  transition: 0.3s;
}

.nav-link .nav-categories-colum{
  padding-bottom: 7px;
  padding-top: 7px;
  width: 100%;
  border-bottom: 2px solid #c7cec5;
}



.nav-link .categorie-next{
    background-position: center center;
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
  height: 100%;
  width: 100%;
}

.nav-slide {
  background-color: #fefffe;
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: left;
  width: 0%;
}
</style>
