<template>
  <div class="articleblock">
    <router-link :to="{
      name: 'communitydetail',
      params: { id: article.id }}">
    <div class="row" style="text-align: center;">
      <div class="col-2">{{ article.id }}</div>
      <div class="col-7">{{ article.title }}</div>
      <div class="col-3">{{ article.username }}</div>
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  },
}
</script>

<style scoped>
div a {
  text-decoration: none;
  color: white;
}
</style>
