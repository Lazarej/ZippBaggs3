<template>
  <div class="search-wrapper">
    <form @submit.prevent="submit">
      <input type="text" v-model="searchText" />
    </form>

    <p>{{ searchText }}</p>
    <p>{{ test }}</p>
    <div class="result-cont">
      <button @click="filter">click</button>
    </div>
    <div v-for="(filter, id) in filters" :key="id">
      <p>{{ filter.attributes.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const searchText = ref("");
    const produits = ref([]);
    const filters = ref([]);
    const test = ref("test");
    const URL = "http://localhost:1337/api/produits/";

    onMounted(async () => {
      const grabData = await fetch(URL + "?populate=*");

      const json = await grabData.json();

      produits.value = json.data;
    });

    watch(
      () => searchText.value,
      (old, notOld) => {
        if (searchText.value.length === 0) {
          filters.value = [];
        } else {
          console.log(filters.value);
          filters.value = produits.value.filter((el) =>
            el.attributes.name
              .toLowerCase()
              .includes(searchText.value.toLowerCase())
          );
        }
      }
    );

    return { filters, searchText, produits, URL, test };
  },
};
</script>

<style lang="css" scoped>
.search-wrapper {
  position: fixed;
  margin-top: 20vh;
  height: 90vh;
  width: 100%;
  background: #fff;
}
</style>
