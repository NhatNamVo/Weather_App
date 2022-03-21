<template>
  <div class="info-container">
    <div class="info-content" v-if="currentWeather">
      <!-- <b-row align-v="start" align-h="center" > -->
      <VueSlickCarousel v-bind="settings">
        <div>
          <div><img src="../../assets/forecast-icon/atm.png" alt="" /></div>
          <div>{{ currentWeather.pressure }} <small>hPa</small></div>
        </div>
        <div>
          <div>
            <img src="../../assets/forecast-icon/humidity.png" alt="" />
          </div>
          <div>{{ currentWeather.humidity }} <small>%</small></div>
        </div>
        <div>
          <div><img src="../../assets/forecast-icon/windy.png" alt="" /></div>
          <div>{{ currentWeather.clouds }} <small>%</small></div>
        </div>
        <div v-if="currentWeather.uvi !== 0">
          <div><img src="../../assets/forecast-icon/uv.png" alt="" /></div>
          <div>{{ currentWeather.uvi }}</div>
        </div>
        <div>
          <div><img src="../../assets/forecast-icon/rainbow.png" alt="" /></div>
          <div>{{ currentWeather.visibility }} <small>m</small></div>
        </div>
        <div>
          <div><img src="../../assets/forecast-icon/windsp.png" alt="" /></div>
          <div>{{ parseFloat(currentWeather.wind_speed).toFixed(1) }} <small>m/s</small></div>
        </div>
        <div v-if="currentWeather.wind_gust">
          <div>
            <img src="../../assets/forecast-icon/strongwind.png" alt="" />
          </div>
          <div>{{ parseFloat(currentWeather.wind_gust).toFixed(1) }} <small>m/s</small></div>
        </div>
        <div v-if="currentWeather.rain">
          <div><img src="../../assets/forecast-icon/rain.png" alt="" /></div>
          <div>{{ currentWeather.rain["1h"] }} <small>mm/h</small></div>
        </div>
      </VueSlickCarousel>
      <!-- </b-row> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueSlickCarousel from 'vue-slick-carousel';
export default {
  name: "InforComponent",
  components: {
    VueSlickCarousel,
  },
  computed: {
    ...mapGetters(["currentWeather"]),
  },
  data() {
    return {
      // set setting for slick slide
      settings: {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 8,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
        ],
      },
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./infomation.scss";
</style>