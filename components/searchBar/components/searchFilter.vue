<template>
<div class="filter">
  <dropdown :title="category" :items="categoryItems" class="category"></dropdown>
  <dropdown :title="listType" :items="listTypeItems" class="type"></dropdown>
  <dropdown :title="sort" :items="sortItems" class="sort"></dropdown>
<!--  <button class="filter__btn category">-->
<!--    {{ category }}-->
<!--  </button>-->
<!--  <button class="filter__btn type">-->
<!--    {{ listType }}-->
<!--  </button>-->
<!--  <button class="filter__btn sort">-->
<!--    {{ sort }}-->
<!--  </button>-->
</div>
</template>

<script>
import dropdown from "@/components/dropdown";
export default {
  name: "searchFilter",
  components: {dropdown},
  data: function () {
    return {
      category: 'Выберите категорию',
      listType: 'Тип статьи',
      sort: 'Сортировать',
    }
  },
  methods: {},
  computed: {
    data() {
      return this.$store.getters["searchFilter.js/getFilterData"];
    },
    categoryItems() {
      return this.$store.getters["searchFilter/getFilterCategories"]
    },
    listTypeItems() {
      return this.$store.getters["searchFilter/getFilterListType"]
    },
    sortItems() {
      return this.$store.getters["searchFilter/getFilterSort"]
    }
  },
  watch: {
    // categories() {
    //   if (this.categories !== 'Выберите категорию') {
    //
    //   }
    // }
  },
  mounted() {

  },
}
</script>

<style lang="scss">
.filter {
  display: flex;
  flex-flow: row;
  margin-top: 40px;
  width: 100%;

  .category {
    flex: 0 1 57.1%;
  }
  .type {
    flex: 0 1 27.3%;
  }
  .sort {
    flex: 0 1 27.3%;
  }
}
</style>
