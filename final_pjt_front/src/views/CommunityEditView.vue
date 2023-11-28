<template>
  <div style="width:100vw; height:100vh; background-color: #121212; color: white; overflow: auto;">
    <div class="container-lg overflow-auto" style="width:55%; height: 84%; background-color: #2D3134; margin-top: 9vh; border-radius: 32px;">

      <div class="d-flex bd-highlight mb-3">
        <div class="p-2 bd-highlight">
          <router-link class="dropdown-item" :to="{ name: 'community' }">
            <i class="fa-solid fa-angle-left ms-1 textshadow" style="font-size: 32px; margin-top: 16px;"></i>
          </router-link></div>
        <div class="p-2 bd-highlight" style="margin-top: 16px;"><span style="font-size: 20px;">게시글 수정</span><br></div>
      </div>

      <form @submit.prevent="updateArticle" style="margin-top: 24px; margin-left: 13px; margin-right: 13px;">
        <input class="form-control" placeholder="제목" type="text" id="title" v-model="article.title"><br>
        <textarea class="form-control" placeholder="내용" id="content" cols="30" rows="14" v-model="article.content"></textarea><br>
        <input class="form-control" style="width: 68px; float: right" type="submit" value="수정" id="Update">
      </form>


    </div>
  </div>

</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityEditView',
  data() {
    return {
      article: {
        title: '',
        content: ''
      }
    }
  },
  created() {
    this.getArticleDetail()
  },
  methods: {
    getArticleDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/${ this.$route.params.id }/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
      .then((res) => {
        console.log(res)
        this.article = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    
    updateArticle() {
      axios({
        method: 'put',
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/`,
        data: this.article,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
      .then((res) => {
        console.log(res)
        // 게시글 수정 후 처리할 작업을 수행하세요
        this.$router.push({ name: 'communitydetail' }) // 수정 후 게시판 목록 페이지로 이동
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>