<template>
   <div class="head">
      <h2>{{title}}</h2>
      <p>{{ info }}</p>
    </div>
</template>

<script lang="ts" setup>

const props =  defineProps({
       title: String,
       info: String,

  })

</script>

<style lang="css" scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 15%;
  align-items: flex-end;
  border-bottom: solid 1px var(--secondary);
  padding-bottom: 40px;
}

.head p {
  font-family: "Monument";
  text-transform: uppercase;
  font-size: 16px;
  color: var(--text);
}
</style>