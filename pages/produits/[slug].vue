<template>
  <div class="page-cont">
    <div class="produit-page">
      <div class="part-left">
        <div class="images-comp" id="image-comp" @wheel="handleWheel($event)">
          <div class="image-cont" v-for="(image, id) in images" :key="id">
          <transition :name="direction">
              <div
              class="select-image" v-show="index === image.index"
              id="image"
              :style="{
                background: `url(http://localhost:1337${image.attributes.url}) center /cover no-repeat`,
              }"
            >
              <p>{{ image.index }}</p>
            </div>
          </transition>
          </div>
        </div>
      </div>
      <div class="part-right"></div>
      <button id="button" @click="next">{{ index }}</button>
    </div>
  </div>
</template>

<script>
import Slide from "~~/components/slide.vue/Slide.vue";
export default {
  components: { Slide },
  setup() {
    const route = useRoute();
    const produit = ref([]);
    const index = ref(0);
    const images = ref([]);
    const direction = ref('')
    const selectedImage = ref("");

    onMounted(async () => {
      console.log("mounted");
      const fetchData = await fetch(
        `http://localhost:1337/api/produits/${route.params.slug}?populate=*`
      );
      const json = await fetchData.json();
      produit.value = json.data.attributes;
      images.value = produit.value.images.data;
      console.log;
      selectedImage.value = images.value[0].attributes.url;
      images.value.forEach((image, index) => {
        image.index = index;
      });
    });

     

    const next = () => {
      if (index.value >= images.value.length) {
        index.value = 0;
      } else {
        
      }
    };

    const handleWheel = (event) => {
      var y = event.deltaY;
     console.log(index.value)
     console.log(images.value.length)
  if (index.value >= images.value.length-1 ) {
    y < 0 ?  index.value -- : null
    direction.value = 'back'
  } else if(y < 0 && index.value !== 0 ) {
     index.value --;
     direction.value = 'back'
  }else if(y > 0 ){
     index.value++;
     direction.value = 'next'
     console.log(direction)

    
  }

    
    };

    return { produit, selectedImage, index, images, next, handleWheel,direction };
  },
};
</script>

<style lang="css" scoped>
p {
  font-size: 84px;
}
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
  background: rgb(195, 69, 69);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
}
.part-right {
  height: 100%;
  width: 40%;
  background: rgb(49, 17, 17);
}

.images-comp {
  width: 500px;
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
  position: absolute;
  right: 0;
  top: 0;
  transition: 5s;
}

.next-enter-active {
  animation: nextIn 2s;
}

.next-leave-active {
   animation: nextOut 2s;
}

@keyframes nextIn {
  from{transform: translateY(100%);}to{transform: translateY(0);}
  
}

@keyframes nextOut {
  from{transform: translateY(0);}to{transform: translateY(-100%);}
  
}

.back-enter-active {
  animation: backIn 2s;
}

.back-leave-active {
   animation: backOut 2s;
}

@keyframes backIn {
  from{transform: translateY(-100%);}to{transform: translateY(0);}
  
}

@keyframes backOut {
  from{transform: translateY(0);}to{transform: translateY(100%);}
  
}


</style>
