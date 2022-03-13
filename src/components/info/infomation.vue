<template>
  <div class="info-container">
    <div class="info-content">
        <div>
            <span>Áp suất:</span><span>{{currentWeather.pressure }} hPa</span>
        </div>
        <div>
            <span>Độ ẩm:</span><span>{{currentWeather.humidity }} %</span>
        </div>
        <div>
            <span>Mây mù:</span><span>{{currentWeather.clouds }} %</span>
        </div>
        <div>
            <span>Chỉ số UV:</span><span>{{currentWeather.uvi }}</span>
        </div>
        <div>
            <span>Tầm quan sát:</span><span>{{currentWeather.visibility }} m</span>
        </div>
        
        <div v-if="currentWeather.wind_gust">
            <span>Gió giật mạnh:</span><span>{{currentWeather.wind_gust }} m/s</span>
        </div>
        <div v-if="currentWeather.rain">
            <span>Lượng mưa trung bình:</span><span>{{currentWeather.rain }} m/s</span>
        </div>
        <div v-if="currentWeather.snow">
            <span>Khối lượng tuyết:</span><span>{{currentWeather.snow }} m/s</span>
        </div>
    </div>
    <div>
        <DailyForcast/>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex';
import DailyForcast from '../daily/daily-forcast.vue';
export default {
  name: "InforComponent",
  components: {
      DailyForcast,
  },
  computed: {
    ...mapGetters(["currentWeather"]),
  },
};
</script>

<style lang="scss" scoped>
@import "./infomation.scss";
</style>