<template>
    <div>
        <img :src="focastIconDisplay" alt="" :width="size" :height="size"/>
    </div>
</template>

<script>
import sunnyIcon from '../../assets/forecast-icon/sunny.png';
import cloudyNight from '../../assets/forecast-icon/night.png';
import cloudyDay from '../../assets/forecast-icon/cloudy-day.png';
import cloudy from '../../assets/forecast-icon/cloudy.png';
import cloudyNightClear from '../../assets/forecast-icon/cloudy-night.png';
import rainy from '../../assets/forecast-icon/rainy.png';
import {ConvertHour} from '../../helper/utils/converDate';
    export default {
        name: "FocastIcon",
        props: ['dataFocast','sunRise','sunSet', 'size'],
        data() {
            return {
                currentIcon: '',
            }
        },
        computed: {
            focastIconDisplay(){
                const {weather, clouds, dt} = this.dataFocast;
                const {main} = weather[0];
                let isDay = false;
                if(ConvertHour(dt)>=ConvertHour(this.sunRise) && ConvertHour(dt)<=ConvertHour(this.sunSet)) isDay = true;
                switch(main){
                    case "Clear":
                        return isDay?sunnyIcon:cloudyNightClear;
                    case "Clouds":
                        if(clouds <=50){
                            return isDay?cloudyDay:cloudyNight;
                        }
                        else{
                            return cloudy;
                        }
                    case "Rain":
                        return rainy;
                    default:
                        return 'no';
                }
            },
            

        }
    }
</script>

<style lang="scss" scoped>

</style>