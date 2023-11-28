<template>
  <div style="height:100vh; width:100vw; background-color:#121212; overflow: hidden;">
    <!-- <carousel :per-page="1" :autoplay="true" :autoplayHoverPause="false" :autoplayTimeout="6000" :loop="true" :paginationEnabled="false" :mouseDrag="false" :speed="2500">
      <slide v-for="(movie, i) in playingMovie.length" :key="movie" :index="i">
          <div style="text-align: left; color: white;">
              <span class="movie-info" sytle="width:50vw">{{ playingMovie[i].title }}</span>
              <img :src="getImage(playingMovie[i].backdrop_path)" style="height: 100vh; width: 100vw; object-fit: cover; filter: brightness(70%);" alt="">
          </div>
      </slide>
    </carousel> -->
    <div style="height: 100vh; width: 100vw; transform: scale(1.1);">
      <carousel-3d :minSwipeDistance="999999" :autoplay="true" :autoplayTimeout="5500" :width="6000" :height="6000" :display="1" :border="0" :animationSpeed="3500" :disable3d="true"
        style="width:100vw; height:100vh;">
        <customslide class="tdslide" v-for="(movie, i) in playingMovie.length-1" :index="i" :key="movie" style="width: 100vw; height: 100vh;">
          <img :src="getImage(playingMovie[i].backdrop_path)" style="width:100vw; height:100vh; object-fit: cover; filter: brightness(70%)" alt="">
          <div class="container d-flex movie-info position:absoulte; top:0px; left:0px">
            <div class="row">
              <div class="col-lg-11 col-md-10 col-sm-8">
                <span style="font-size: 3vw;">{{ playingMovie[i].title }}</span><br>
                <span style="font-size: 1.4vw; margin-left: 0.3vw;">{{ playingMovie[i].original_title }}</span><br>
                <span style="font-size: 1vw; margin-left: 0.3vw;">{{ (playingMovie[i].vote_average/2).toFixed(2) }}점 | {{ playingMovie[i].vote_count }}개의 평가 | 인기도 {{ (playingMovie[i].popularity).toFixed(0) }} </span><br>
                <span style="font-size: 1vw; margin-left: 0.3vw;">{{ genrelist[playingMovie[i].genre_ids[0]] }} | {{ genrelist[playingMovie[i].genre_ids[1]] }}</span><br>
                <div style="width: 75%; margin-left: 0.3vw; margin-top: 0.3vw">
                  <span style="font-size: 0.8vw; ">{{ playingMovie[i].overview }}</span><br>
                </div>
                <a :href="'http://localhost:8080/'+playingMovie[i].id">
                  <button class="detailbutton detailcss btn btn-sm btn-outline mt-2 border" style="box-shadow: 1px 1px 6px black; margin-left: 0.3vw; font-size: 0.6vw; color: white;">
                  <svg xmlns="http://www.w3.org/2000/svg" style="width: 0.6vw;" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg> 상세정보
                </button>
                </a>
              </div>
            </div>
          </div>
        </customslide>
      </carousel-3d>
    </div>

    <carousel-3d :space="372" :display="15" :animationSpeed="1000" :autoplayHoverPause="true" :autoplayTimeout="3000" :border="0" :width="200" :height="300" :controls-visible="false" :autoplay="true"
      style="height: 308px; position: absolute; bottom: 1%">
      <customslide class="tdslide" v-for="(movie, i) in upcomingMovie.length" :index="i" :key="movie">
        <div class="posterboxhover">
          <a :href="'http://localhost:8080/'+upcomingMovie[i].id">
            <img class="imghover" :src="getPosterImage(upcomingMovie[i].poster_path)" style="width:200px; height:300px" alt="">
            <span class="postertext poster-info">상세정보</span>
          </a>
        </div>
      </customslide>
    </carousel-3d>
  </div>
</template>

<script>
import axios from 'axios';
import { Carousel3d, Slide as Customslide } from 'vue-carousel-3d'

document.body.style.overflow = "hidden"


export default {
  name: 'MainView',
  data() {
    return {
      playingMovie: [],
      hotMovie: null,
      apiKey: '5d04d2a1b7de0a896d4252e4e473a01b',
      upcomingMovie: null,
      slideHoverIndex: null,
      movieInfo: null,
      genrelist: {
        28: '액션', 12: '모험', 16: '애니메이션', 35: '코미디', 80: '범죄', 99: '다큐멘터리', 18: '드라마', 10751: '가족', 14: '판타지',
        36: '역사', 27: '공포', 10402: '음악', 9648: '미스터리', 10749: '로맨스', 878: 'SF', 10770: 'TV 영화', 53: '스릴러', 10752: '전쟁', 37: '서부'
      }
    };
  },
  components: {
    Carousel3d,
    Customslide
  },
  methods: {
    getNowPlaying() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=ko-KR`,
      })
        .then((response) => {
          const temp = response.data.results
          this.playingMovie = temp.filter(
            (movie) =>
              !movie.genre_ids.includes(27) && !movie.genre_ids.includes(53)
          );
        });
    },
    getImage(url) {
      return `https://image.tmdb.org/t/p/original${url}`
    },
    getPosterImage(url) {
      return `https://image.tmdb.org/t/p/w500${url}`
    },
    getHotMovie() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=ko-KR`,
      })
        .then((response) => {
          this.hotMovie = response.data.results
        });
    },
    getUpcoming() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=ko-KR&page=1`,
      })
        .then((response) => {
          this.upcomingMovie = response.data.results
          // this.playingMovie = temp.filter(
          //   (movie) =>
          //     !movie.genre_ids.includes(27) && !movie.genre_ids.includes(53))
        });

    },

  },
  created() {
    this.getNowPlaying()
    this.getHotMovie()
    this.getUpcoming()
  },
};
</script>

<style>
.tdslide {
  box-shadow: 2px 2px 8px black;
  text-align: center;

}

.movie-info {
  position: absolute;
  top: 19vh;
  left: 13vw;
  font-weight: bold;
  color: white;
  z-index: 1;
  text-shadow: 1px 1px 6px black;
  text-align: left;
}

.poster-info {
  text-shadow: 10px 10px 10px black;
  position: absolute;
  top: 43%;
  left: 32%;
  font-weight: bold;
  font-size: 120%;
  color: white;
  z-index: 1;
}

.posterboxhover {
  transition: all ease 0.6s;
  transform: scale(1);
}

.posterboxhover:hover {
  transition: all ease 0.6s;
  transform: scale(1.1);
}

.postertext {
  transition: all ease 0.6s;
  opacity: 0;
}

.imghover {
  transition: all ease 0.6s;
  filter: brightness(100%);
}

.imghover:hover {
  transition: all ease 0.6s;
  filter: brightness(70%);
}

.imghover:hover + .postertext {
  opacity: 1;
}

.detailbutton:hover {
  transition: all ease 0.6s;
  opacity: 80%;
  transform: scale(1.05)
}
</style>