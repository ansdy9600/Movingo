<template>
  <div class="article-list">
    <div>
      <div class="row" style="font-size: 24px;text-align: center; text-shadow: 1px 1px 1px lightgray;">
        <div class="col-2">번호</div>
        <div class="col-7">제목</div>
        <div class="col-3">작성자</div>
      </div>
    </div>
    <div style="text-shadow: 1px 1px 1px lightgray">
      <ArticleListItem class="articleblock" style="padding-top: 13px; padding-bottom: 13px;"
      v-for="article in articles" :key="article.id" :article="article"
      />
    </div>
  </div>
</template>

<script>
import ArticleListItem from '@/components/ArticleListItem'

export default {
  name: 'ArticleList',
  components: {
    ArticleListItem,
  },
  computed: {
    articles() {
      return this.$store.state.articles
    }
  }
}
</script>

<style>
.article-list {
  text-align: start;
}

.articleblock:hover {
  background-color: #888685;
}
</style>
