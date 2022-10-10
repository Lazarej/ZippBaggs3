<template>
  <section class="presentation" id="vitrineSection">
    <div class="text-pres-container">
      <div class="text-link-cont">
        <h2>Choisi ton packson</h2>
        <nuxt-link class="pres-link" to=""><p>ici</p></nuxt-link>
      </div>
    </div>
    <div class="d-container">
     <iframe src='https://my.spline.design/untitled-01c4739f0a8e7d7a5d6d8826f84a3cae/' frameborder='0' width='100%' height='100%'></iframe>
      
    </div>

    <div class="vermine">

    </div>
  </section>
</template>

<script>
export default {
  name: "Presentation",
};
</script>

<style lang="css" scoped>
.presentation {
  height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
}

.text-pres-container {
  height: 100%;
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  

}

.text-link-cont{
  display: flex;
  flex-direction: column;
  width: 230px;
  margin-right: 10%;
}

.text-link-cont h2,.text-link-cont a{
  font-weight: 700;
  font-family: 'Lektorat';
font-size: 106px;
line-height: 100px;
letter-spacing: -0.03em;
text-transform: uppercase;
}

.pres-link{
  position: relative;
  width: max-content;
  margin-top: 10px;
  font-family:"Lektorat";
  color:#3F8F51 ;
  text-decoration: none;
}

.pres-link p:after{
  content: '';
  position: absolute;
  height: 6px;
  width: 100%;
  background-color: #3F8F51;
  left: 0;
  top: 100%;
  transform: scaleX(0);
  transition: transform 0.4s;
  transform-origin: left;
}

.pres-link p:hover:after{

  transform: scaleX(1);

}

.d-container {
  height: 100%;
  width: 55%;
}


.vermine{
  position: absolute;
  height: 50px;
  width: 50px;
  bottom: 0;
  right: 0;
  background-color: #FEFFFE;
}


@media (max-width: 500px) {

  .presentation{
    flex-direction: column;
  }

  .text-pres-container {
    position: absolute;
    width: 100%;
    justify-content: initial;
  align-items: initial;
  }

  .text-link-cont{
  display: flex;
  flex-direction: column;
  width: 230px;
  margin-top: 20vh;
  margin-left: 10%;
}

  .text-link-cont h2,.text-link-cont a{
  font-weight: 700;
   font-size: 76px;
  line-height: 70px;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.d-image{
  margin-left:15vw;
  margin-top: 20vh;
  width: 85%;
  height: 70%;
  background: url("~assets/img/3dImage.png")  center / cover no-repeat;
}
  
}
</style>
