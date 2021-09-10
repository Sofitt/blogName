<template>
  <div class="app">
    <div class="container">
      <searchBar></searchBar>
    </div>
  </div>
</template>

<script>
import searchBar from "@/components/searchBar/searchBar";
export default {
  name: 'App',
  components: searchBar
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
