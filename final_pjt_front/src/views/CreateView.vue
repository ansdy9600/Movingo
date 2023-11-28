<template>
  <div style="width:100vw; height:100vh; background-color: #121212; color: white; overflow: auto;">
    <div class="container-lg overflow-auto" style="width:55%; height: 84%; background-color: #2D3134; margin-top: 9vh; border-radius: 32px;">

      <div class="d-flex bd-highlight mb-3">
        <div class="p-2 bd-highlight">
          <router-link class="dropdown-item" :to="{ name: 'community' }">
            <i class="fa-solid fa-angle-left ms-1 textshadow" style="font-size: 32px; margin-top: 16px;"></i>
          </router-link></div>
        <div class="p-2 bd-highlight" style="margin-top: 16px;"><span style="font-size: 20px;">게시글 작성</span><br></div>
      </div>

      <form @submit.prevent="createArticle" style="margin-top: 24px; margin-left: 13px; margin-right: 13px;">
        <input class="form-control" placeholder="제목" type="text" id="title" v-model.trim="title"><br>
        <textarea class="form-control" placeholder="내용" id="content" cols="30" rows="14" v-model="content"></textarea><br>
        <input class="form-control" style="width: 68px; float: right" type="submit" value="작성" id="submit">
      </form>


    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CreateView',
  data() {
    return {
      title: null,
      content: null,
    }
  },
  methods: {
    createArticle() {
      const title = this.title
      const content = this.content

      if (!title) {
        alert('제목 입력해주세요')
        return
      } else if (!content){
        alert('내용 입력해주세요')
        return
      }
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/articles/`,
        data: { title, content },
        headers: {
          Authorization : `Token ${this.$store.state.token}`
        }
      })
      .then(() => {
        // console.log(res)
        this.$router.push({name: 'community'})
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
span {
    text-shadow: 1px 1px 1px lightgray;
    margin-left: 10px;
  }
.textshadow {
  text-shadow: 1px 1px 1px lightgray;
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(121, 121, 121, 0.3); 
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(40, 40, 40, 0.5); 
}
</style>
