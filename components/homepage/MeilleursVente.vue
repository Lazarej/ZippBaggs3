<template>
  <section class="meilleurs-vente">
    <h2>Nos meilleurs ventes</h2>
    <div class="best-product-cont" >
      <div class="best-product">
        <div class="best-product-card" v-for="(bestProduct,id) in bestProducts" :key="id">
          <div class="card-image" :style="{ background: `url(${bestProduct.image}) center /cover no-repeat` }">
          </div>
          <div class="card-info">
            <p>{{bestProduct.name}}</p>
            <p>{{bestProduct.prix}}</p>
          </div>         
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Meilleursvente",

  props: ["myJson"],

  data() {
    return {
      bestProducts: [],
    };
  },

  

  mounted() {
    this.myJson.categories.forEach((cat) => {
      cat.produits.map((item) => this.bestProducts.push(item));
    });

    while (this.bestProducts.length > 5) {
      var min = Math.min(...this.bestProducts.map((item) => item.vendu));
      var indexOfMin = this.bestProducts.findIndex(
        (bestProduct) => bestProduct.vendu == min
      );
      this.bestProducts.splice(indexOfMin, 1);
    }

   /*let slider = document.querySelector('.best-product');
    let innerSlider = document.querySelector('.best-product-card');

    let pressed = false ;
    let startx ;
    let x;

    slider.addEventListener('mousedown', (e)=>{
      pressed = true;
      startx = e.offsetX - innerSlider.offsetLeft;
      console.log(innerSlider.offsetLeft)
      slider.style.cursor = 'grabbing'
    } )*/
  },

  
};
</script>

<style lang="css" scoped>
.meilleurs-vente {
  height: 100vh;
  width: 93%;
  padding: 0% 0px 0px 7%;
}

.meilleurs-vente h2 {
  margin-bottom: 80px;
  margin-top: 50px;
}

.best-product-cont {
  display: flex;
  height: 500px;
  width: 100%;
}

.best-product {
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  display: flex;
}

.best-product::-webkit-scrollbar{
  height: 3px;
}

.best-product::-webkit-scrollbar-track{
  margin-right: 30px;
}

.best-product-card{
  display: flex;
  margin-right: 10px;
  flex-direction: column;
  height: 90%;
  min-width: 300px;
  overflow: hidden;
}

.card-image{
  width: 100%;
  height: 90%;
  transition: 0.3s;

}

.best-product-card:hover .card-image{
  transform: scale(1.05);
 
}

.card-info{
  height: 60px;
  width: 100%;
  position: relative;
  background-color: #fefffe;
}

.card-info p:nth-child(1){
  font-size: 18px;
  font-weight: 400;
}

.card-info p:nth-child(2){
  margin-top: 5px;
}

.card-info p{
   margin-top: 10px;
   font-family: "Roboto";
}

@media (min-width: 500px) {

  .meilleurs-vente{
    margin-bottom: 20vh;
  }

  .meilleurs-vente h2{
    font-size: 64px;
    margin-bottom: 80px;
    margin-top: 80px;
  }

  .best-product-cont{
    height: 550px;
  }

  .best-product-card{
    min-width: 350px ;
  }

  .best-product::-webkit-scrollbar{
  height: 5px;
}

.best-product::-webkit-scrollbar-track{
  margin-right: 7vw;

}
  
}
</style>
