<template>
  <div style="width:100vw; height:100vh; background-color: #121212; color: white; overflow: auto;">
    <br><br><br>
    <div class="container-lg" style="height:100%; margin-top:16px;">
    <!-- 포스터 + 기본정보 -->
      <div class="row">
        <div class="col d-flex">
          <img :src="getImage(movieInfo.poster_path)" class="me-4 mt-2 col-4" style="box-shadow: 1px 1px 3px darkgray" alt=""><br>
          <div class="text-start col-7" style="position:relative;">
            <span style="font-size: 3vw;">{{ movieInfo.title }}</span><br>
            <div style="margin-left: 0.3vw;">
              <span style="font-size: 1.5vw">{{ movieInfo.original_title  }}</span><br>
              <span style="font-size: 1vw">{{ (movieInfo.release_date).slice(0, 4) }}년 {{ (movieInfo.release_date).slice(5, 7) }}월 {{ (movieInfo.release_date).slice(8, 10) }}일 | {{ movieInfo.runtime }}분</span><br>
              <div style="display: inline-block" v-for="genre in getGenre()" :key="genre">
                <span style="font-size: 1vw" class="me-2">{{ movieInfo.genres[genre-1].name }}</span>
              </div>
              <div class="d-flex mt-1 mb-1">
                <star-rating class="me-2" :rating="Number((movieInfo.vote_average/2).toFixed(2))" :show-rating="false" :read-only="true" :increment="0.01"
                :star-size="21" style="position: relative; bottom: 2.2px;"></star-rating>
                <span>{{ (movieInfo.vote_average / 2).toFixed(2) }}</span>
              </div>
              <span style="font-size: 0.8vw">{{ movieInfo.overview }}</span>
            </div>
          </div>
        </div>
      
    </div><br><br><br>

    <!-- 감독/출연진 + 티저영상 -->
    <div class="row">
      <div class="col-4">
        <div class="mt-3">
          <div class="d-flex" style="width: 100%;">
            <div style="display: inline-block" v-for="idx in directors.length" :key="idx">
              <div class="profilebox" style="margin-right: 1.5vw">
                <img class="center-cropped rounded-circle" style="box-shadow: 1px 1px 3px darkgray"
                  :src="getProfilePic(directors[idx-1].profile_path)" alt="">
                  <br><br>
                  <div class="text-center">
                    <span>{{ directors[idx-1].name }}</span>
                  </div>
                  <br><br>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div style="display: inline-block" v-for="aidx in actors.length" :key="aidx">
              <div class="profilebox" style="margin-right: 1.5vw">
                <img class="center-cropped rounded-circle" style="box-shadow: 1px 1px 3px darkgray"
                  :src="getProfilePic(actors[aidx-1].profile_path)" alt="">
                <br><br>
                <div class="text-center">
                  <span>{{ actors[aidx-1].name }}</span>
                </div>
                <br><br>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="player" class="col-7 ms-5">
        <div style="width:100%; height:100%;">
          <youtube style="width: 100%; box-shadow: 1px 1px 3px darkgray;"
            id="video"
            :video-id="youtubeKey"
            :player-vars="playerVars">
          </youtube>
        </div>
      </div>
    </div>
    <br>
    

    <!-- 리뷰 -->
    <div class="text-start">
      <br><h1>Reviews</h1><hr>
      <div class="row mt-3">
        <div class="col d-flex">
          <div class="col-2">
            <star-rating class="ms-1 mt-2" :increment="0.5" :star-size="23" @rating-selected="setRating"></star-rating>
          </div>
          <div class="col-10">
            <!-- <input class="form-control ms-3 me-4" placeholder="댓글" type="text" name="" id=""> -->
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="댓글" aria-label="Recipient's username" aria-describedby="button-addon2">
              <button class="btn btn-outline-secondary me-1" type="button" id="button-addon2" @click="postReviews()">작성</button>
            </div>
          </div>
          <!-- <button class="btn btn-primary ms-4">작성</button> -->
        </div>
        <div class="mt-3" v-for="review in reviewList" :key="review">
          <div class="d-flex ms-2">
            <span>{{ review.author }}</span>
            <star-rating class="ms-2" :rating="review.rating" :read-only="true" 
            :increment="0.01" :star-size="15" :show-rating="false" style="position: relative; bottom: 2.8px;"></star-rating>
            {{ review.rating }}
          </div>
          <span class="ms-2">{{ review.comment }}</span><br>
          <button type="submit" class="btn btn-sm me-1 text-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
              <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
            </svg> {{ review.likes }}
          </button>
          <button type="submit" class="btn btn-sm text-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
              <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
            </svg> {{ review.dislikes }}
          </button>
          <br><br><br>
          
        </div>
      </div>
    </div>
  </div>
    <br><br>

    </div>
</template>
  
  <script src="https://www.youtube.com/iframe_api"></script>
  <script>
  import axios from 'axios'
  import StarRating from 'vue-star-rating'
  
  export default {
    name: 'MovieDetailView',
    computed: {
      isLogin() {
        return this.$store.getters.isLogin
      }
    },
    components: {
      StarRating
    },
    data() {
      return {
        movieId: this.$route.params.movieId,
        movieInfo: null,
        directors: null,
        actors: null,
        apiKey: '5d04d2a1b7de0a896d4252e4e473a01b',
        youtubeKey: null,
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
        },
        reviewList: null,
        newRating: '',
      }
    },
    methods: {
      getMovieDetail() {
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${this.apiKey}&language=ko-KR`
        })
        .then((response) => {
          this.movieInfo = response.data
        })
      },
  
      getImage(url) {
        return `https://image.tmdb.org/t/p/w500/${url}`
      },
  
      getGenre() {
        const movieLength = this.movieInfo.genres.length
        return movieLength
      },
  
      getCrews() {
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/${this.movieId}/credits?api_key=${this.apiKey}`
        })
        // .then(response => response.json())
        // .then((jsonData)=>jsonData.crew.filter(({job})=> job ==='Director'))
        .then((res) => {
          this.directors = res.data.crew.filter(item => item.job === 'Director')
          const actorstemp = res.data.cast.sort((a,b) => b.popularity - a.popularity)
          this.actors = actorstemp.slice(0, 3)
        })
      },
  
      getProfilePic(url) {
        return `https://image.tmdb.org/t/p/w185/${url}`
      },
  
      getVideoKey() {
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/${this.movieId}/videos?api_key=${this.apiKey}&language=ko-KR`
        })
        .then((vres) => {
          if (vres.data.results[0]) {
            this.youtubeKey = vres.data.results[0].key
          }
        })
      },
  
      getComments() {
        this.reviewList = this.$store.state.reviews
      },
      postReviews() {
        if (this.isLogin) {
          this.$store.dispatch('sendReviewsToServer')
        } else {
          alert('로그인이 필요한 서비스 입니다.')
          this.$router.push({ name: 'login' })
        }
      },
  
      setRating(rating) {
        this.newRating = rating
      }
    },
    created() {
    this.getMovieDetail()
    this.getCrews()
    this.getVideoKey()
    this.getComments()
    }
  
  }
  
  
  </script>
  
  <style scoped>
  .center-cropped {
    object-fit: cover;
    object-position: center;
    height: 92px;
    width: 92px;
  }
  
  .profilebox {
    width: 92px;
  }
  
  span {
    text-shadow: 1px 1px 1px lightgray;
  }
  
  
  </style>
  