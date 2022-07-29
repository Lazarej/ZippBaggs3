<template>
      <div v-show="isVisible" class="carousel-slide">
     
        <slot></slot>
      </div>
</template>

<script>
export default {
    props: {
    index: Number
  },
  setup(props){
    

   const instance = getCurrentInstance()
    watch(()=>instance.parent.ctx.index,(old,next)=>{
        console.log(props.index)
    })
   const isVisible = index.value  === instance.parent.ctx.index
    console.log(props.index)
    console.log(instance.parent.ctx.index)


    return{isVisible}
  }
}
</script>

<style>
.carousel-slide {
  width: 100%;
  display: flex;
}
@media (max-width: 900px){
    .carousel-slide {
    flex-direction: column-reverse;
  }
}

</style>