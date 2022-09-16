<template>
  <div class="card-produit">
          <nuxt-link tag="a" :to="link">
            <div class="card-image-cont">
              <div
              class="card-image"
              :style="{
                background: image,
              }"
            >
            </div>
            </div>
            <div class="info-card">
              <p>{{ name }}</p>
              <p>{{ price +' €' }}  </p>
            </div>
          </nuxt-link>
        </div>
</template>

<script lang="ts" setup>

  const props =  defineProps({
       link: String,
       image: String,
       name: String,
       price: Number
  })

</script>

<style lang='css' scoped>
.card-produit {
  width: calc(100% / 5);
  margin: 0 2.6% 30px 2.6%;
  height: calc(10px + 25vw);
}

.card-image-cont{
  height: 90%;
  width: 100%;
  overflow: hidden;
}

.card-image-cont:hover .card-image{
  transform: scale(1.05);
}
.card-image {
  height: 100%;
  width: 100%;
  transition: 0.5s ease-out;
}

.card-image a {
  text-decoration:none;
}

.info-card{
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  font-family: 'LektoratL';
  text-transform: uppercase;
  color: #2C2C29;
}

.card-produit:nth-of-type(4n + 1) {
  margin-left: 3.2%;
}

.card-produit:nth-of-type(4n) {
  margin-right: 0;
}
</style>