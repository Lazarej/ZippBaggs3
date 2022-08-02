<template>
  <div>
      <NavBar/>
    <slot />
  </div>
</template>

<script>
import NavBar from "../components/global/navbar/NavBar.vue";
export default {
  components: { NavBar },
}
</script>