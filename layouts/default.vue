<template>
  <div>
      <NavBar/>
    <slot />
  </div>
</template>

<script>
import NavBar from "../components/navbar/NavBar.vue";
export default {
  components: { NavBar },
}
</script>