<template>
<div class="filter">
  <div class="filter__drops">
    <dropdown :uid="1" :isCheckbox="true" :title="category" :items="categoryItems" class="category"/>
    <dropdown :uid="2" :title="listType" :items="listTypeItems" class="type"/>
    <dropdown :uid="3" :title="sort" :items="sortItems" class="sort"/>
  </div>

  <div v-if="filterBtnsState === true" class="filter__btns">
    <button class="filter__btn reset" @click="resetTags()">Сбросить</button>
    <button class="filter__btn apply">Применить</button>
  </div>
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
  methods: {
    resetTags() {
      this.$store.commit('searchFilter/resetCurrentTitle');
    }
  },
  computed: {
    // data() {
    //   return this.$store.getters["searchFilter.js/getFilterData"];
    // },
    categoryItems() {
      return this.$store.getters["searchFilter/getFilterCategories"]
    },
    listTypeItems() {
      return this.$store.getters["searchFilter/getFilterListType"]
    },
    sortItems() {
      return this.$store.getters["searchFilter/getFilterSort"]
    },
    filterBtnsState() {
      return this.$store.getters["searchFilter/getFilterBtnsState"];
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
@import "assets/scss/style";
.filter {
  display: flex;
  flex-flow: column;
  margin-top: 40px;
  width: 100%;

  &__drops {
    z-index: 1;
    display: flex;
    flex-flow: row;
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

  &__btns {
    position: absolute;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    max-width: 1277px;
    margin-top: 70px;
    padding-top: 30px;
    border-top: 1px solid #E5E5E5;
  }
  &__btn {
    width: 163px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E8E6E6;
    border-radius: 6px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height, or 125% */
    letter-spacing: 0.2px;

    @include transitionAll();
    //transition: all 0.3s ease 0s;

    &:first-child {
      margin-right: 30px;
    }
    &.reset {
      color: #A3A6B1;

      &:hover {
        color: rgba(82, 87, 92, 1);
        background: #f1f1f1;
        @include transitionAll();
        //transition: all 0.3s ease 0s;
      }
    }
    &.apply {
      border-color: #43A5D2;
      color: #43A5D2;

      &:hover {
        background: #f1f1f1;
        //color: #62c8f8;
      }
    }
  }
}
</style>
