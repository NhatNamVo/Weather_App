<template>
  <div class="info-container"  v-if="currentWeather" :style="{backgroundImage: `url(${focastIconDisplay})`}">
    <div class="info-content">
      <div>
        <h6>{{location}}</h6>
      </div>
      <div>
          <span>{{currentWeather.weather[0].description}}</span>
      </div>
      <div>
          {{Math.round(currentWeather.temp)}}<sup>o</sup>C
      </div>
  </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import sunnyIcon from '../../assets/background/clearly.jpg';
import cloudyNight from '../../assets/background/cloudyNight.jpg';
import cloudyDay from '../../assets/background/cloudyDay.jpg';
import cloudyD from '../../assets/background/cloudy.jpg';
import cloudyN from '../../assets/background/cloudyN.jpg';
import cloudyNightClear from '../../assets/background/clearly.jpg';
import rainyNight from '../../assets/background/rainyNight.jpg';
import rainyDay from '../../assets/background/rainyDay.jpg';
import {ConvertHour} from '../../helper/utils/converDate';
export default {
  name: "EffectComponent",
  computed: {
    ...mapGetters(["currentWeather","todayData"]),
    ...mapState(['location']),
    focastIconDisplay(){
                const { clouds, dt, sunrise, sunset} = this.currentWeather;
                const {main} = this.todayData[0].weather[0];
                let isDay = false;
                if(ConvertHour(dt)>=ConvertHour(sunrise) && ConvertHour(dt)<=ConvertHour(sunset)) isDay = true;
                switch(main){
                    case "Clear":
                        return isDay?sunnyIcon:cloudyNightClear;
                    case "Clouds":
                        if(clouds <=50){
                            return isDay?cloudyDay:cloudyNight;
                        }
                        else{
                            return isDay?cloudyD:cloudyN;
                        }
                    case "Rain":
                        return isDay?rainyDay:rainyNight;
                    default:
                        return 'no';
                }
            },
  },
};
</script>

<style lang="scss" scoped>
@import './effect.scss';
</style>