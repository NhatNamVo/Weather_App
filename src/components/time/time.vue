<template>
    <div ref="timeContainer" class="time-container" :style="{height: width + 'px'}">
        <div class="time-content">
            <p>
                {{currentTime}}
            </p>
            
            
        </div>
            
        
        
    </div>
</template>

<script>
    import moment from 'moment';
import { mapActions } from 'vuex';
    export default {
        name: 'TimeComponent',

        data() {
            return {
                width: 0,
                setTime: null,
                currentTime: null,
                currentDate: null,
                currentHour: null,
                isOpenCalendar: false,
                currentCalendarPosition: 0,
            }
        },
        methods:{
            ...mapActions(['fetchWeatherData']),
            resizeHeight(event){
                const {outerWidth} = event.target;
                const eleWidth = 0.5*outerWidth;
                this.width = eleWidth;
            },
            activeTime() {
                const time = moment(new Date()).format("HH:mm:ss");
                const hour = new Date().getHours();
                if(hour !== this.currentHour){
                    this.currentHour = hour;
                    this.fetchWeatherData;
                }
                this.currentTime = time;
            },
            handleShowCalendar(e) {
                const calendarIcon = e.target.closest('span.calendar-icon');
                const calendarTable = e.target.closest('.calendar-table');
                if(calendarIcon){
                    this.currentCalendarPosition = e.y;  
                    this.isOpenCalendar = !this.isOpenCalendar;
                }
                else if(calendarTable) {
                    e.stopPropagation();
                }
                else{
                    if(this.isOpenCalendar) this.isOpenCalendar = false;
                }
            },
            handleChangeDate(value, e) {
                console.log(e);
                if(value.selectedFormatted.includes('/')){
                    this.currentDate=value.selectedFormatted;
                    console.log('handleChangeDate:',value.selectedFormatted);
                }
            }
        },
        computed:{
            // activeDate() {
            //     const date = moment(new Date()).format("DD/MM/YYYY");
            //     return date;
            // },
            
        },
        watch: {
            // currentSec() {
            //     this.activeTime();
            // },
        },
        created() {
            this.currentTime = moment(new Date()).format("hh:mm:ss");
            this.currentDate = moment(new Date()).format("DD/MM/YYYY");
            this.width = window.outerWidth*0.5;
        },
        mounted() {
            this.setTime = setInterval(() => {
                this.activeTime();
            }, 1000);
            window.addEventListener('resize', (e)=>this.resizeHeight(e));
        },
        beforeDestroy(){
            window.removeEventListener('resize', (e)=>this.resizeHeight(e));
            clearInterval(this.setTime);
        }

        
    }
</script>

<style lang="scss" scoped>
@import './time.scss';

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>