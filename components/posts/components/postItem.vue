<template>
  <div class="postItem" >
    <div class="postItem__main">
      <div class="postItem__inner">
        <div class="postItem__header">
          <!-- PROF-POST & tag / date -->
        </div>
        <h3 class="postItem__title">
          <!-- TITLE -->
        </h3>
        <p class="postItem__subtitle">
          <!-- TEXT -->
        </p>
      </div>
      <div class="postItem__img">
        <!-- IMG -->
      </div>
    </div>
    <div class="postItem__footer">
      <div class="postItem__info">
        <!-- АВТОР ИЛИ ТЕГ -->
        <div class="postItem__avatar">

        </div>
        <div class="postItem__footer-block">
          <span class="postItem__footer-name"></span>
          <span class="postItem__footer-publish">Опубликовано {{date}}</span>
        </div>
      </div>
      <a href="" class="postItem__footer-read">Читать статью <span class="postItem__footer-icon"/></a>
    </div>

  </div>
</template>

<script>
export default {
  name: "postItem",
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
.postItem {
  display: flex;
  flex-flow: column;
  background: #FFFFFF;
  max-width: 626px;
  max-height: 360px;
  padding: 30px 20px 24px;

  &__main {
    display: flex;
    flex-flow: row;
  }
  &__inner {
    display: flex;
    flex-flow: column;
  }
  &__header {
    display: flex;
    flex-flow: row;
  }
}
</style>
