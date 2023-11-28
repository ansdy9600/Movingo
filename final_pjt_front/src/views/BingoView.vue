<template>
  <div style="width:100vw; height:100vh; background-color: #121212; color: white; overflow: auto;">
    <div class="container-lg overflow-auto" style="width:84%; height: 84%; background-color: #2D3134; margin-top: 9vh; border-radius: 32px;">
      <br>
      <div class="container">
        <div class="col-5 mx-auto">
          <div style="text-align: center">
            <span style="font-size: 56px;">Bingo</span>
          </div>
          <br><br>
          <div class="input-group mb-3">
          <input class="form-control" placeholder="키워드" style="width:50%" type="text" v-model="keyword" @keyup.enter="getKeyword(keyword)">
          <button class="btn btn-outline-light" @click="getKeyword(keyword)">추가</button></div>
          <button v-for="(kw, index) in keywordList" :key="kw" class="btn btn-outline-light me-2 mb-1" @click="deleteKeyword(index)">
            {{ kw }} <i class="fa-solid fa-x"></i></button>
          <br><br>

          <div class="input-group mb-3">
          <input class="form-control" placeholder="배우" style="width:50%" type="text" v-model="actor" @keyup.enter="getActor(actor)">
          <button class="btn btn-outline-light" @click="getActor(actor)">추가</button></div>
          <button v-for="(at, index) in actorList" :key="at" class="btn btn-outline-light me-2 mb-1" @click="deleteActor(index)">
            {{ at }} <i class="fa-solid fa-x"></i></button>
          <br><br>

          <div class="input-group mb-3">
          <input class="form-control" list="datalistOptions1" id="exampleDataList1" placeholder="재밌게 본 영화" style="width:50%"
          v-model="searchKeyword" @keyup="searchMovie(searchKeyword)" @keyup.enter="getFilm(searchKeyword)">
            <datalist id="datalistOptions1">
              <option v-for="title in searchList" :key="title" :value="title.name"></option>
            </datalist>
            <!-- 검색기능 -->
          <!-- <input class="form-control" placeholder="재밌게 본 영화" style="width:50%" type="text" v-model="film" @keyup.enter="getFilm(film)"> -->
          <button class="btn btn-outline-light" @click="getFilm(searchKeyword)">추가</button></div>
          <button v-for="(fi, index) in filmList" :key="fi" class="btn btn-outline-light me-2 mb-1" @click="deleteFilm(index)">
            {{ fi }} <i class="fa-solid fa-x"></i></button>
          <br><br>
          <div style="text-align: center;">
            <button class="btn btn-outline-light" @click="getMovies()">저장</button>
            <button v-if="randMovies[0] != 0" class="btn btn-outline-danger ms-2" @click="resetMovie()">리셋</button><br><br>
            <button v-if="movies[0]" class="btn btn-outline-light" @click="getRandomMovies(movies)">{{ randMovies[0] ? "다시 만들기" : "빙고 만들기" }}</button><br><br>
            <span v-if="bingoCount != 0 & bingoCount != 8">빙고 {{ bingoCount }}개</span>
            <span v-if="bingoCount == 8">축하합니다! 빙고를 완성하셨습니다!</span>

          </div>
        </div>
      

        <div style="display: flex; justify-content: center; margin-top: 12px;">
          <div v-if="randMovies[0] != 0">
            <div class="d-flex">
              <div class="bingo-box" style="position: relative"><img :class="['poster-image', seenMovies[0] ? 'seen' : '']" class="poster-image" :src="getPosterImage(randMovies[0].poster_path)" @click="changeState(0)" alt="">
                <span :class="seenMovies[0] ? 'on-image-watched' : 'on-image-not-watched'">시청함</span>
                <a :href="localURL+randMovies[0].id" target="_blank"><button class="btn btn-outline btn-sm border text-light on-image-button">상세정보</button></a>
              </div>
              <div class="bingo-box" style="position: relative"><img :class="['poster-image', seenMovies[1] ? 'seen' : '']" class="poster-image" :src="getPosterImage(randMovies[1].poster_path)" @click="changeState(1)" alt="">
                <span :class="seenMovies[1] ? 'on-image-watched' : 'on-image-not-watched'">시청함</span>
                <a :href="localURL+randMovies[1].id" target="_blank"><button class="btn btn-outline btn-sm border text-light on-image-button">상세정보</button></a>
              </div>
              <div class="bingo-box" style="position: relative"><img :class="['poster-image', seenMovies[2] ? 'seen' : '']" class="poster-image" :src="getPosterImage(randMovies[2].poster_path)" @click="changeState(2)" alt="">
                <span :class="seenMovies[2] ? 'on-image-watched' : 'on-image-not-watched'">시청함</span>
                <a :href="localURL+randMovies[2].id" target="_blank"><button class="btn btn-outline btn-sm border text-light on-image-button">상세정보</button></a>
              </div>
            </div>
            <div class="d-flex">
              <div class="bingo-box" style="position: relative"><img :class="['poster-image', seenMovies[3] ? 'seen' : '']" class="poster-image" :src="getPosterImage(randMovies[3].poster_path)" @click="changeState(3)" alt="">
                <span :class="seenMovies[3] ? 'on-image-watched' : 'on-image-not-watched'">시청함</span>
                <a :href="localURL+randMovies[3].id" target="_blank"><button class="btn btn-outline btn-sm border text-light on-image-button">상세정보</button></a>
              </div>
              <div class="bingo-box" style="position: relative"><img :class="['poster-image', seenMovies[4] ? 'seen' : '']" class="poster-image" :src="getPosterImage(randMovies[4].poster_path)" @click="changeState(4)" alt="">
                <span :class="seenMovies[4] ? 'on-image-watched' : 'on-image-not-watched'">시청함</span>
                <a :href="localURL+randMovies[4].id" target="_blank"><button class="btn btn-outline btn-sm border text-light on-image-button">상세정보</button></a>
              </div>
              <div class="bingo-box" style="position: relative"><img :class="['poster-image', seenMovies[5] ? 'seen' : '']" class="poster-image" :src="getPosterImage(randMovies[5].poster_path)" @click="changeState(5)" alt="">
                <span :class="seenMovies[5] ? 'on-image-watched' : 'on-image-not-watched'">시청함</span>
                <a :href="localURL+randMovies[5].id" target="_blank"><button class="btn btn-outline btn-sm border text-light on-image-button">상세정보</button></a>
              </div>
            </div>
            <div class="d-flex">
              <div class="bingo-box" style="position: relative"><img :class="['poster-image', seenMovies[6] ? 'seen' : '']" class="poster-image" :src="getPosterImage(randMovies[6].poster_path)" @click="changeState(6)" alt="">
                <span :class="seenMovies[6] ? 'on-image-watched' : 'on-image-not-watched'">시청함</span>
                <a :href="localURL+randMovies[6].id" target="_blank"><button class="btn btn-outline btn-sm border text-light on-image-button">상세정보</button></a>
              </div>
              <div class="bingo-box" style="position: relative"><img :class="['poster-image', seenMovies[7] ? 'seen' : '']" class="poster-image" :src="getPosterImage(randMovies[7].poster_path)" @click="changeState(7)" alt="">
                <span :class="seenMovies[7] ? 'on-image-watched' : 'on-image-not-watched'">시청함</span>
                <a :href="localURL+randMovies[7].id" target="_blank"><button class="btn btn-outline btn-sm border text-light on-image-button">상세정보</button></a>
              </div>
              <div class="bingo-box" style="position: relative"><img :class="['poster-image', seenMovies[8] ? 'seen' : '']" class="poster-image" :src="getPosterImage(randMovies[8].poster_path)" @click="changeState(8)" alt="">
                <span :class="seenMovies[8] ? 'on-image-watched' : 'on-image-not-watched'">시청함</span>
                <a :href="localURL+randMovies[8].id" target="_blank"><button class="btn btn-outline btn-sm border text-light on-image-button">상세정보</button></a>
              </div>
            </div>
          </div>
        </div>
      </div><br><br>
    </div>
  </div>
</template>


<style scoped>
span {
    text-shadow: 1px 1px 1px lightgray;
  }

.on-image-watched {
  position:absolute;
  top:42%;
  left:36%;
  opacity: 100%;
  transition: all ease 0.5s;
  text-shadow: 1px 1px 4px white;
}
.on-image-not-watched {
  position:absolute;
  top:42%;
  left:36%;
  opacity: 0%;
  transition: all ease 0.5s;
}

.on-image-button {
  position: absolute;
  top: 65%;
  left: 29%;
  text-shadow: 1px 1px 4px white;
  opacity: 0%;
  transition: all ease 0.5s;
}

.bingo-box:hover .on-image-button {
  opacity: 100%;
}

.bingo-box {
  width: 180px;
  height: 260px;
  border: 1px black solid;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(100%);
  transition: all ease 0.4s;
}

.seen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(30%);
  transition: all ease 0.5s;
}

.poster-image:hover {
  filter: brightness(65%);
  transition: all ease 0.4s;
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


</style>


<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  
  name: 'BingoView',
  data() {
    return {
      apiKey: '5d04d2a1b7de0a896d4252e4e473a01b',
      // 검색기능
      searchKeyword: null,  // v-model, 넘기기용
      searchList: [],       // 실시간 검색결과
      searchedData: [],     // 영화 id 리스트
      filmList: [],         // 영화 제목
      // 검색기능
      keyword: null,
      keywordList: [],
      actor: null,
      actorList: [],
      movies: [],
      randMovies: [0,0,0,0,0,0,0,0,0],
      seenMovies: [0,0,0,0,0,0,0,0,0],
      bingoCount: 0,
      localURL: 'http://localhost:8080/'
    }
  },

  computed: {
  },

  methods: {
    changeState(idx) {
      if (this.seenMovies[idx] === 0) {
        this.$set(this.seenMovies, idx, 1)
      } else {
        this.$set(this.seenMovies, idx, 0)
      }
      this.checkBingos()
    },

    checkBingos() {
      const rows = [
        [0, 1, 2], // 1 가로
        [3, 4, 5], // 2 가로
        [6, 7, 8], // 3 가로
        [0, 3, 6], // 1 세로
        [1, 4, 7], // 2 세로
        [2, 5, 8], // 3 세로
        [0, 4, 8], // 우하 대각
        [2, 4, 6]  // 우상 대각
      ];

      let count = 0;

      rows.forEach(row => {
        if (
          this.seenMovies[row[0]] === 1 &&
          this.seenMovies[row[1]] === 1 &&
          this.seenMovies[row[2]] === 1
        ) {
          count++;
        }
      });

      this.bingoCount = count;
    },

    getPosterImage(url) {
      return `https://image.tmdb.org/t/p/w500${url}`
    },

    getRandomMovies (movielist) {
      this.randMovies = _.sampleSize(movielist, 9)
      for (let i = 0; i < this.seenMovies.length; i++) {
        this.$set(this.seenMovies, i, 0)
        this.bingoCount = 0
      }
    }
    ,
    
    getKeyword(kw) {
      if (kw) {
        if (this.keywordList.length <3) {
          this.keywordList.push(kw)
        } else {
          alert('네개 이상 추가할 수 없습니다!')
        }
      }
      this.keyword = null
    },
    getActor(at) {
      if (at) {
        if (this.actorList.length <3) {
          this.actorList.push(at)
        } else {
          alert('네개 이상 추가할 수 없습니다!')
        }
      }
      this.actor = null
    },
    getFilm(fi) {
      if (fi) {
        if (this.filmList.length <3) {
          this.filmList.push(fi)
          this.searchedData.push(this.searchList[0].id)
        } else {
          alert('네개 이상 추가할 수 없습니다!')
        }
      }
      this.searchKeyword = null
    },

    deleteKeyword(i) {
      this.keywordList.splice(i,1)
    },
    deleteActor(i) {
      this.actorList.splice(i,1)
    },
    deleteFilm(i) {
      this.filmList.splice(i,1)
      this.searchedData.splice(i,1)
    },


    searchMovie(keyword) {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${this.apiKey}&include_adult=false&language=ko-KR&page=1`
      })
      .then((response) => {
          this.searchList = []
          const responseTemp = response.data.results.slice(0, 10)
          for (let i=0; i<responseTemp.length; i++)
          this.searchList.push({name:responseTemp[i].title, id:responseTemp[i].id, poster:responseTemp[i].poster_path})
          this.seenMovies = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        })
        
    },


    getMovies() {
      this.movies = []
      for (let i=0; i<this.keywordList.length; i++) {
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/search/movie?query=${this.keywordList[i]}&api_key=${this.apiKey}&include_adult=false&language=ko-KR&page=1`
        })
        .then((kwresponse) => {
          const kwmovies = kwresponse.data.results
          for (let j=0; j<kwmovies.length; j++) {
            this.movies.push(kwmovies[j])
          }
        })
      }
      for (let i=0; i<this.actorList.length; i++) {
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/search/person?query=${this.actorList[i]}&api_key=${this.apiKey}&include_adult=false&language=ko-KR&page=1`
        })
        .then((atresponse) => {
          const atmovies = atresponse.data.results[0].known_for.filter(item => item.media_type === "movie")
          for (let j=0; j<atmovies.length; j++) {
            this.movies.push(atmovies[j])
          }
        })
      }
      for (let i=0; i<this.searchedData.length; i++) {
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/${this.searchedData[i]}/recommendations?api_key=${this.apiKey}&language=ko-KR&page=1`
        })
        .then((firesponse) => {
          const fimovies = firesponse.data.results
          for (let j=0; j<fimovies.length; j++) {
            this.movies.push(fimovies[j])
          }
        })
      }


      // this.keywordList = []
      // this.actorList = []
      // this.searchedData = []
      // this.filmList = []
    },
    resetMovie() {
      this.keywordList = []
      this.actorList = []
      this.searchedData = []
      this.filmList = []
      this.randMovies = [0,0,0,0,0,0,0,0,0]
      this.movies = []
      this.bingoCount = 0
    }

  },
}
</script>