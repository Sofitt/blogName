<template>
<section class="posts">
  <postItem :posts="posts" :key="posts.index" v-for="post of posts"/>
</section>
</template>

<script>
import postItem from "@/components/posts/components/postItem";
export default {
  name: "posts",
  components: {postItem},
  data: function () {
    return {
      posts: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {

  },
}
</script>

<style>

</style>
