<template>
  <div>
    <button :class="{active: currentDate===1}" @click="handleSelectDate(1)">Hôm nay</button>
    <button :class="{active: currentDate===2}" @click="handleSelectDate(2)">Ngày mai</button>
    <button :class="{active: currentDate===3}" @click="handleSelectDate(3)">Ngày kia</button>
    <div>
        <template v-for="(item, idx) in currentData">
            <div :key="idx">
                <p>{{item.weather[0].main}}</p>
                <p>{{(new Date(item.dt * 1000)).getHours()}}:00</p>
            </div>
        </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "DailyForcast",
  data() {
    return {
      currentDate: 1,
      currentData: null,
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
    ...mapGetters(["todayData", "afterTomorowData", "tomorowData"]),
  },
  mounted(){
    this.currentData = this.todayData;
  }
};
</script>

<style lang="scss" scoped>
.active{
    background-color: #f76161;
}
</style>