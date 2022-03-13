<template>
  <div class='calendar-content'>
      <div class="calendar-table" :style="{top: topPosition + 20 + 'px'}">
          <b-calendar
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="vi"
            :hide-header="true"
            @context="onContext"
        />
      </div>
  </div>
</template>

<script>
export default {
  name: "CalendarComponent",
  props: ["topPosition"],
  methods: {
      onContext(value){
          this.$emit('handleChangeDate', value, this.$event)
      },
  }
};
</script>

<style lang="scss" scoped>
@import './calendar.scss';
</style>