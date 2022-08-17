<template>
  <section class="selection">
      <div class="background">
          <div class="text-selec-cont">
              <div class="text-cont trans">
                <p>Decouvrez notre selection</p>
              </div>
              <div class="text-cont plein">
                  <p>Decouvrez notre selection</p>
              </div>
          </div> 
          <button class="selection-btn">
            <p >voir</p>
          </button>   
      </div>
  </section>
</template>

<script>
export default {

    name:'Selection',

}
</script>

<style scoped>


.selection{
    height: 100vh;
    width: 100%;
    background: url('../../assets/img/phoneSelect.png') center / cover  no-repeat;
}

.background{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

}

.text-selec-cont{
    height: 500px;
    width: 70%;

}

.text-cont{
    width: 100%;
    height: 50%;
    text-align: center;
    overflow: hidden;
    font-family: 'MonumentB';
    text-transform: uppercase;
    font-style: normal;
    font-weight: normal;
    line-height: 90px;
font-size: 104px;
position: relative;

}

.trans p{
    overflow: hidden;
    -webkit-text-stroke: 0.5px #FEFFFE;
    color: transparent;
    position: absolute;
    top: 48%;

}

.plein p{
    overflow: hidden;
    color: #FEFFFE;
    margin-bottom: 73px;
    position: absolute;
    top: -52%;
}

.selection-btn{
    width: 300px;
    height: 120px;
    background: transparent;
    border: 1px solid #FEFFFE;
    border-radius: 100px;

}
.selection-btn p{
overflow: hidden;
    -webkit-text-stroke: 0.5px #FEFFFE;
    color: transparent;
    font-family: 'Lektorat';
    text-transform: uppercase;
    font-size: 30px;

}

@media (min-width: 500px) {

    .selection{
    height: 120vh;
    width: 100%;
    background-color: #3f8f52;
    
}

.background{
    height: 100%;
    width: 100%;
    background: url('../../assets/img/select.png') 30% -110% / cover  no-repeat;
}
    
}
</style>