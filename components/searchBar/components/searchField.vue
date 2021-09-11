<template>
  <div class="searchField">
    <img src="../../../assets/svg/search-icon.svg" alt="" class="searchField__find icon">
    <input type="text" class="searchField__input" :placeholder="title">
  </div>
</template>

<script>
export default {
  name: "searchField",
  props: ['title'],
  components: {},
  data: function () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {

  },
}
</script>

<style lang="scss">
.searchField {
  display: flex;
  flex-flow: row;
  align-items: center;
  flex: 1 1 100%;
  //max-width: 1068px;
  // Icon
  &__find {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding-left: 18px;

    &.icon {
      //position: absolute;
      min-width: 24px !important;
      min-height: 24px !important;
    }
  }
  // Поле для ввода
  &__input {
    padding-left: 60px;
    height: 40px;
    flex: 1 1 100%;
    //background: red; // Отладка****

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height, or 125% */
    letter-spacing: 0.2px;

    color: #3B3C40;

    &::placeholder {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.2px;

      color: #C1C3CA;
    }
  }
}
</style>
