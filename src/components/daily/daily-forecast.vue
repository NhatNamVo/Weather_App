<template>
  <div class="forecast-daily-container" v-if="currentData">
    <div class="forecast-title">
      Hôm nay
    </div>
    <VueSlickCarousel v-bind="settings" v-if="todayData.length >0">
      <template v-for="(item, idx) in todayData">
        <div class="forecast-item" :key="idx">
          <div class="forecast-item-content" :class="{active: idx === 0}">
            <FocastIcon :size="50" :dataFocast="item" :sunRise="currentWeather.sunrise" :sunSet="currentWeather.sunset"/>
            <p>{{ new Date(item.dt * 1000).getHours() }}:00</p>
          </div>
        </div>
      </template>
    </VueSlickCarousel>
    <div class="forecast-title">
      Ngày mai
    </div>
    <VueSlickCarousel v-bind="settings" v-if="tomorowData.length >0">
      <template v-for="(item, idx) in tomorowData">
        <div class="forecast-item" :key="idx">
          <div class="forecast-item-content">
            <FocastIcon :size="50" :dataFocast="item" :sunRise="currentWeather.sunrise" :sunSet="currentWeather.sunset"/>
            <p>{{ new Date(item.dt * 1000).getHours() }}:00</p>
          </div>
        </div>
      </template>
    </VueSlickCarousel>
    <div class="forecast-title">
      Ngày kia
    </div>
    <VueSlickCarousel v-bind="settings" v-if="afterTomorowData.length >0">
      <template v-for="(item, idx) in afterTomorowData">
        <div class="forecast-item" :key="idx">
          <div class="forecast-item-content">
            <FocastIcon :size="50" :dataFocast="item" :sunRise="currentWeather.sunrise" :sunSet="currentWeather.sunset"/>
            <p>{{ new Date(item.dt * 1000).getHours() }}:00</p>
          </div>
        </div>
      </template>
    </VueSlickCarousel>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import VueSlickCarousel from 'vue-slick-carousel';
import FocastIcon from '../focast/focast-icon.vue';
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  name: "DailyForecast",
  components: {VueSlickCarousel, FocastIcon},
  data() {
    return {
      currentDate: 1,
      currentData: null,
      settings: {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 12,
        slidesToScroll: 6,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 10,
              slidesToScroll: 6,
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
    };
  },
  methods: {
    handleSelectDate(value) {
      switch (value) {
        case 1:
          this.currentDate = value;
          this.currentData = this.todayData;
          break;
        case 2:
          this.currentDate = value;
          this.currentData = this.tomorowData;
          break;
        case 3:
          this.currentDate = value;
          this.currentData = this.afterTomorowData;
          break;
      }
    },
  },
  computed: {
    ...mapGetters(["todayData", "afterTomorowData", "tomorowData", "currentWeather"]),
    ...mapState({
      search: (state) => state.search,
    }),
  },
  mounted() {
    this.currentData = this.todayData;
  },
  watch: {
    todayData(newValue, oldValue) {
      if (newValue !== oldValue) {
        switch (this.currentDate) {
          case 1:
            this.currentData = this.todayData;
            break;
          case 2:
            this.currentData = this.tomorowData;
            break;
          case 3:
            this.currentData = this.afterTomorowData;
            break;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './daily-forecast.scss';
</style>