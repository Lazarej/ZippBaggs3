<template>
  <div class="page-cont">
    <div class="produit-page">
      <div class="part-left">
        <div class="text-for-product">
           <h3>Nos produits</h3>
           <p>Nos produits sont des produits vraiment super nous adorons les mettre en avant car ils sont super , je pense tres honnetement que vous ne vous rendez pas compte a quel point ils sont super mega cool </p>
        </div>
        <div class="part-left-rel-cont">
          <div class="image-selection">
            <div
              class="image-selection-image"
              v-for="(image, id) in images"
              :key="id"
            >
              <div
                @click="seeImg(image.index)"
                :style="{
                  background: `url(http://localhost:1337${image.attributes.url}) center /cover no-repeat`,
                }"
              ></div>
            </div>
          </div>
          <div class="scroll-progess-bar">
            <div class="progress" :style="{ height: `${progress}%` }"></div>
          </div>
          <div class="comp-cont">
            <div
              class="images-comp"
              id="image-comp"
              @wheel="handleWheel($event)"
            >
              <div class="image-cont" v-for="(image, id) in images" :key="id">
                <transition :name="direction">
                  <div
                    class="select-image"
                    id="image"
                    :style="{
                      background: `url(http://localhost:1337${image.attributes.url}) center /cover no-repeat`,
                    }"
                  ></div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="part-right">
        <div class="produit-info-cont">
          <div class="produit-info">
            <h2 class="name">{{ produit.name }}</h2>

            <div class="description-cont">
              <p class="description">{{ produit.description }}</p>
            </div>
            <p class="price">{{ produit.price }} EUR</p>

            <div class="multi-select">
              <select class="select" name="quantity" id="quantity" v-model="quantity">
                <option value="1">1</option>
                <option v-if="produit.quantity > 10" :value="10">10</option>
                <option v-if="produit.quantity > 20" :value="20">20</option>
                <option v-if="produit.quantity > 40" :value="40">40</option>
                <option  v-if="produit.quantity > 100" :value="100">100</option>
              </select>
            </div>
          </div>
          <button @click="add" class="buy-btn">Ajoutez au panier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useCartStore } from '../../store/cart'
export default {

  setup() {
    const store = useCartStore()
    const route = useRoute();
    const produit = ref([]);
    const index = ref(0);
    const images = ref([]);
    const direction = ref("");
    const progress = ref();
    const quantity = ref(1);
    const id = ref()
    const {cart} =  storeToRefs(store)

    const add = () => {
      store.addToCart({id: id.value, qty: quantity.value})
    };

    const seeImg = (indexImg) => {
      const heightI = document.getElementById("image").offsetHeight;
      let iComp = document.getElementById("image-comp").style;

      index.value = indexImg;
      progress.value = (100 / images.value.length) * (index.value + 1);
      iComp.transform = `translateY(-${index.value * heightI}px)`;

      
    };

    onMounted(async () => {
      store.loadCartInstance()
      const fetchData = await fetch(
        `http://localhost:1337/api/produits/${route.params.slug}?populate=*`
      );
      const json = await fetchData.json();
      produit.value = json.data.attributes;
      images.value = produit.value.images.data;
      id.value = json.data.id
      images.value.forEach((image, index) => {
        image.index = index;
      });

      progress.value = 100 / images.value.length;
    });

    const handleWheel = (event) => {
      const y = event.deltaY;
      const heightI = document.getElementById("image").offsetHeight;
      const mult = index.value * heightI;
      let iComp = document.getElementById("image-comp").style;
      if (index.value >= images.value.length - 1) {
        y < 0
          ? index.value-- &&
            (iComp.transform = `translateY(-${mult - heightI}px)`) &&
            (progress.value =
              (100 / images.value.length) * (index.value + 2) -
              100 / images.value.length)
          : null;
      } else if (y < 0 && index.value !== 0) {
        index.value--;

        progress.value =
          (100 / images.value.length) * (index.value + 2) -
          (100 / images.value.length - 1);
        progress.value <= 3 ? (progress.value = 0) : null;
        iComp.transform = `translateY(-${mult - heightI}px)`;
      } else if (y > 0) {
        index.value++;
        progress.value = (100 / images.value.length) * (index.value + 1);
        iComp.transform = `translateY(-${index.value * heightI}px)`;
      }
    };

    return {
      produit,
      index,
      images,
      handleWheel,
      direction,
      progress,
      seeImg,
      quantity,
      add,
      store,
      id
    };
  },
};
</script>

<style lang="css" scoped>
.page-cont {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: flex-end;
}
.produit-page {
  height: calc(100% - 17vh);
  width: 90%;
  padding: 0 5% 7vh 5%;

  display: flex;
}

.part-left {
  height: 100%;
  width: 60%;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.text-for-product{
  width: 150px;

}

.text-for-product h3{
  font-size: 24px;
  margin-bottom: 20px;
  line-height: 90%;
  font-family: "Nimbus";
}

.text-for-product p{
  font-family: "Montserrat";
  font-size: 12px;
  letter-spacing: -1px;
  line-height: 17px;
  color: rgb(111, 111, 111);

}

.part-left-rel-cont {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: flex-end;
}

.comp-cont {
  width: 403px !important;
  height: 100%;
}

.images-comp {
  position: absolute;
  top: 0;
  right: 0;
  transition: 1s;
}

.image-cont {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
}
.select-image {
  width: 400px;
  height: 83vh;
  transition: 5s;
}

.scroll-progess-bar {
  height: 100%;
  width: 1px;
  background: #c7cec5;
  margin-right: calc(20px + 0.3%);
  margin-left: calc(20px + 0.3%);
}

.progress {
  width: 100%;
  height: 0%;
  transform-origin: top;
  background: var(--text);
  transition: 0.5s ease-in-out;
}

.image-selection {
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: 0.5s ease-in-out;
}

.part-left-rel-cont:hover .image-selection {
  opacity: 1;
}

.image-selection-image {
  width: 40px;
  height: 50px;
  margin: 0 0 4px 0;
}

.image-selection-image div {
  height: 100%;
  width: 100%;
}
.part-right {
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.produit-info-cont {
  margin-left: calc(15% - 20px);
  width: 300px;
  display: flex;
  flex-direction: column;
}

.name {
  margin-top: 0;
  margin-bottom: 40px;
  line-height: 90%;
  font-family: "Nimbus";
}

.description-cont {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.description {
  font-family: "Montserrat";
  font-size: 13px;
  letter-spacing: -1px;
  line-height: 20px;
  color: rgb(111, 111, 111);
}

.price {
  font-size: 13px;
  font-family: "Nimbus";
  color: rgb(111, 111, 111);
  margin-bottom: 20px;
}

.buy-btn {
  height: 60px;
  font-size: 16px;
  font-family: "Roboto";
  text-transform: uppercase;
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
</style>
