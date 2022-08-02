<template>
  <div class="wrapper-cont">
    <div class="wrapper">
       <slot/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>

.wrapper-cont{
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: flex-end;
}

.wrapper{
    height: calc(100% - 17vh);
        width: 90%;
    padding: 0 5% 7vh 5%;
}

</style>