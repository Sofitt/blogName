<template>
<section class="search">
  <div class="search__main">
    <div class="search__bar">
      <searchField :title="'Поиск по статьям'"></searchField>
<!--      <img src="../../assets/svg/search-icon.svg" alt="" class="search__find icon">-->
<!--      <input type="text" class="search__input" placeholder="Поиск по статьям">-->
      <!-- Или сюда btn -->
      <button class="search__filter">
        <img src="../../assets/svg/filter-icon.svg" alt="" class="icon">
      </button>
    </div>
    <button class="search__btn">
      <!-- иконка -->
      <img src="../../assets/svg/list-plus-icon.svg" alt="" class="search__listPlus icon">
      Новая статья
    </button>
  </div>
<searchFilter></searchFilter>
</section>
</template>

<script>
import searchField from "@/components/searchBar/components/searchField";
import searchFilter from "@/components/searchBar/components/searchFilter";
export default {
  name: "searchBar",
  components: {searchField, searchFilter},
  data: function () {
    return {

    }
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {

  },
}
</script>

<style lang="scss">
@import "../../assets/scss/style";

.search {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 150px;

  &__main {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-height: 40px;
  }

  &__bar {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    border: 1px solid #E8E6E6;
    border-radius: 6px;
    width: 100%;
    max-width: 1068px;
  }
  // Filter btn
  &__filter {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 16px;
    padding-left: 16px;

    background: transparent;
  }

// Новая статья - КНОПКА
  &__btn {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 183px;
    height: 40px;
    padding: 0 20px;

    color: #FFFFFF;
    background: #43A5D2;
    border-radius: 6px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */
    letter-spacing: 0.2px;

    &:hover {
      background: #4491b5;
      @include transitionAll();
      //transition: all 0.3s ease 0s;
    }
  }
}
.icon {
  //position: absolute;
  min-width: 24px !important;
  min-height: 24px !important;
}
</style>
