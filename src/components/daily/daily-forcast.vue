<template>
  <div v-if="currentData">
    <div>
      Hôm nay
    </div>
    <VueSlickCarousel v-bind="settings" v-if="todayData.length >0">
      <template v-for="(item, idx) in todayData">
        <div :key="idx">
          <FocastIcon :dataFocast="item" :sunRise="currentWeather.sunrise" :sunSet="currentWeather.sunset"/>
          <p>{{ new Date(item.dt * 1000).getHours() }}:00</p>
        </div>
      </template>
    </VueSlickCarousel>
    <div>
      Ngày mai
    </div>
    <VueSlickCarousel v-bind="settings" v-if="tomorowData.length >0">
      <template v-for="(item, idx) in tomorowData">
        <div :key="idx">
          <FocastIcon :dataFocast="item" :sunRise="currentWeather.sunrise" :sunSet="currentWeather.sunset"/>
          <p>{{ new Date(item.dt * 1000).getHours() }}:00</p>
        </div>
      </template>
    </VueSlickCarousel>
    <div>
      Ngày kia
    </div>
    <VueSlickCarousel v-bind="settings" v-if="afterTomorowData.length >0">
      <template v-for="(item, idx) in afterTomorowData">
        <div :key="idx">
          <FocastIcon :dataFocast="item" :sunRise="currentWeather.sunrise" :sunSet="currentWeather.sunset"/>
          <p>{{ new Date(item.dt * 1000).getHours() }}:00</p>
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
  name: "DailyForcast",
  components: {VueSlickCarousel, FocastIcon},
  data() {
    return {
      currentDate: 1,
      currentData: null,
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
.active {
  background-color: #f76161;
}
</style>