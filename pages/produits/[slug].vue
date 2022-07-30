<template>
  <div class="page-cont">
    <div class="produit-page">
      <div class="part-left">
        
        <div class="part-left-rel-cont">
          <div class="scroll-progess-bar">
          <div class="progress" :style="{ height: `${progress}%` }"></div>
        </div>
          <div class="images-comp" id="image-comp" @wheel="handleWheel($event)">
            <div class="image-cont" v-for="(image, id) in images" :key="id">
              <transition :name="direction">
                <div
                  class="select-image"
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
      </div>
      <div class="part-right"></div>
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
    const direction = ref("");
    const progress = ref();

    onMounted(async () => {
      console.log("mounted");
      const fetchData = await fetch(
        `http://localhost:1337/api/produits/${route.params.slug}?populate=*`
      );
      const json = await fetchData.json();
      produit.value = json.data.attributes;
      images.value = produit.value.images.data;
      console.log;
      images.value.forEach((image, index) => {
        image.index = index;
      });
    });



    const handleWheel = (event) => {
      const y = event.deltaY;
      const heightI = document.getElementById("image").offsetHeight;
      const x = index.value * heightI;

      if (index.value >= images.value.length - 1) {
        y < 0
          ? index.value-- && (document.getElementById("image-comp").style.transform = `translateY(-${x - heightI}px)`) && (progress.value = ((100 / images.value.length) * (index.value + 1 )) - (100 / images.value.length)) 
          : null;
      } else if (y < 0 && index.value !== 0) {
        index.value--;       7                         
        progress.value = ((100 / images.value.length) * (index.value+1 )) - (100 / images.value.length-1) ;
        progress.value <= 3 ? progress.value =0 : null
        document.getElementById("image-comp").style.transform = `translateY(-${
          x - heightI
        }px)`;
      } else if (y > 0) {
        index.value++;
        progress.value = (100 / images.value.length) * (index.value + 1);
        document.getElementById("image-comp").style.transform = `translateY(-${
          index.value * heightI
        }px)`;
      }
      
      
    };

    return { produit, index, images, handleWheel, direction, progress };
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
  width: 70%;

  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
}

.part-left-rel-cont {
  position: relative;
  width: 60%;
  height: 100%;
}

.images-comp {
  width: calc(100% -5vw);
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
  margin-right: calc(10px + 0.3%);
  margin-left: calc(10px + 0.3%);
}

.progress {
  width: 100%;
  height: 0%;
  transform-origin: top;
  background: var(--primary);
  transition: 0.5s ease-in-out;
}
.part-right {
  height: 100%;
  width: 40%;
  background: rgb(49, 17, 17);
}
</style>
