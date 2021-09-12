<template>
  <div class="app">
    <div class="container">
      <searchBar></searchBar>
      <posts></posts>
    </div>
  </div>
</template>

<script>
import searchBar from "@/components/searchBar/searchBar";
import posts from "@/components/posts/posts";
export default {
  name: 'App',
  components: searchBar, posts,

  mounted() {
    // this.$store.commit("searchFilter/updateActiveData");
  }
}
</script>
<style lang="scss">
.app {

  .container {
    margin: 0 auto;
    width: 1277px;
  }
}
</style>
