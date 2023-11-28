<template>
  <div style="width:100vw; height:100vh; background-color: #121212; color: white; overflow: auto;">
    <div class="container-lg overflow-auto" style="width:55%; height: 84%; background-color: #2D3134; margin-top: 9vh; border-radius: 32px;">

      <div class="d-flex bd-highlight mb-1">
        <div class="p-2 bd-highlight">
          <router-link class="dropdown-item" :to="{ name: 'community' }">
            <i class="fa-solid fa-angle-left ms-1 textshadow" style="font-size: 32px; margin-top: 16px;"></i>
          </router-link></div>
        <div class="ms-auto p-2 bd-highlight mt-2">
          <div class="dropstart">
            <a class="btn btn-outline text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">           
              <i class="fa-solid fa-ellipsis-vertical textshadow" style="font-size: 28px; margin-top: 2px;"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" @click="editArticle()">Edit</a></li>
              <li><a class="dropdown-item" @click="deleteArticle()">Delete</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div style="word-break: break-all">
        <!-- 여기부터 -->
        <div class="d-flex bd-highlight">
          <span style="font-size: 56px;">{{ article?.title }}</span><br>
          <div class="ms-auto p-2 bd-highlight mt-3">
            <span style="text-shadow: none; font-size: 24px; margin-right: 5px;" @click="toggleLikeButton"><i :class="iconClass"></i></span>
          </div>
        </div>
        <!-- 여기까지 -->  
        <span><i class="fa-solid fa-hashtag ms-1"></i> {{ article?.id }}</span>
        <span><i class="fas fa-user"></i> {{ article?.username }}</span>
        <span v-if="article?.created_at"><i class="fa-solid fa-calendar"></i> {{ (article?.created_at).slice(2,4) }}.{{ (article?.created_at).slice(5,7) }}.{{ (article?.created_at).slice(8,10) }}.</span>
        <span v-if="article?.created_at"><i class="fa-solid fa-clock"></i> {{ (article?.created_at).slice(11, 16) }}</span><br><br>
      </div>
      <div class="textshadow" style="margin-left: 13px; margin-right: 13px; word-break: break-all;">
        {{ article?.content }}
      </div>
        
      <!-- Article Like UI -->
      <!-- <div style="float: left; margin-top:15px;">
        <button class=" btn btn-outline-danger waves-effect mb-4" @click="likeArticle({ articlePk: article.pk })">
          좋아요 ♥ {{ like_count }}
        </button>
      </div> -->
      <!-- <button class="delete-button" @click="deleteArticle()">Delete</button> -->
      <br><br><br><br><br><br><br>
      <span style="font-size: 28px;">댓글</span>
      <span style="font-size: 16px;">{{ comments.length }}개</span>
      <hr>
      <div class="comment-hover" v-for="comment in comments" :key="comment">
        <div class="d-flex bd-highlight mb-3">
          <div class="p-2 bd-highlight">
            <span style="margin-left: 5px; font-size: 17px;"><i class="fas fa-user"></i> {{ comment.username }}</span><br>
            <span style="margin-left: 5px; font-size: 17px;">{{ comment.content }}</span>
          </div>
          <div class="ms-auto p-2 bd-highlight">
            <span style="color: lightgray; font-size: 13px">{{ comment.created_at.slice(5,7) }}.{{ comment.created_at.slice(8,10) }}
            {{ comment.created_at.slice(11,13) }}:{{ comment.created_at.slice(14,16) }}</span><br>
            <span class="before-hover" @click="deleteComment(comment.id)"><i class="fa-solid fa-trash"></i></span>
          </div>
        </div>
        <hr>
        <!-- <button @click="editComment(comment.id)">edit</button> -->
        <!-- 댓글 작성자, 작성 일자 등 추가 필드 표시 -->
      </div>

      <form class="d-flex">
        <input type="text" class="form-control" placeholder="댓글" aria-label="comment" aria-describedby="button-addon2" v-model="comment">
        <input class="form-control" style="width: 68px; float: right" type="submit" value="작성" id="submit" @click="addComment()">
      </form>
      <br>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityDetailView',
  data() {
    return {
      article: null,
      likedOrNot: false,
      comment: null,
      comments: [],
      content : ''
    }
  },
  created() {
    this.getArticleDetail(),
    this.getComment()
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
    deleteArticle() {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }        
      })
        .then((res) => {
          console.log(res)
          this.$router.push({ name: 'community' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editArticle() {
    this.$router.push({ name: 'communityedit', params: { id: this.article.id } });
    },
    addComment() {
      const commentData = {
        content: this.comment,
        article: this.article.id
      }
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/create_comments/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
        data: commentData
      })
      .then((res) => {
        console.log(res)
        this.comment = null
        this.getComment()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getComment() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/comments/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
      })
      .then((res) => {
        this.comments = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deleteComment(comment) {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/comments/${comment}/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
      .then((res) => {
          console.log(res)
          this.getComment()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // editComment(comment) {
    //   axios({
    //     method: 'put',
    //     url: `${API_URL}/api/v1/articles/${this.$route.params.id}/comments/${comment}/`,
    //     headers: {
    //       Authorization: `Token ${ this.$store.state.token }`
    //     },
    //     data: { content : this.content }
    //   }) 
    //   .then((res) => {
    //       console.log(res)
    //       this.getComment()
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
        
        // 여기부터
    toggleLikeButton() {
      this.likedOrNot = !this.likedOrNot
    }
  },
  computed: {
    iconClass() {
      return this.likedOrNot ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart text-light'
    },

  }
  // 여기까지
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
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(40, 40, 40, 0.5); 
}

.before-hover{
  color: lightgray;
  float: right;
  opacity: 0%
}

.comment-hover:hover .before-hover{
  color: lightgray;
  float: right;
  opacity: 100%;
}


</style>