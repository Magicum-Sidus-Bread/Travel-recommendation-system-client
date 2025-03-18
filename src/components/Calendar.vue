<template>
  <DayPilotCalendar id="dp" :config="config" ref="calendar" />
</template>

<script>
import {DayPilot, DayPilotCalendar} from 'daypilot-pro-vue'
// docs: https://doc.daypilot.org/calendar/
// demo: https://builder.daypilot.org/calendar
export default {
  name: 'Calendar',
  data: function() {
    return {
      config: {
        locale: "zh-cn",
        viewType: "Resources",
        columns: this.generateCols(),
        columnWidthSpec: "Fixed",
        columnWidth: 100,
        heightSpec: "Full",
        dayBeginsHour: 8,
        dayEndsHour: 22,
        timeRangeSelectedHandling: "Enabled",
        allowEventOverlap: false,
        events: this.$props.events,
        onTimeRangeSelected: (args) => {
          this.$emit("createPlace", args)
        },
        eventDeleteHandling: "Update",
        onEventDeleted: (args) => {
          this.$emit("deletePlace", args)
        },
        eventMoveHandling: "Update",
        onEventMoved: (args) => {
          this.$emit("movePlace", args)
        },
        eventResizeHandling: "Update",
        onEventResizeHandling: (args) => {
          this.$emit("resizePlace", args)
        },
        eventClickHandling: "Enabled",
        onEventClicked: (args) => {
          this.$emit("clickPlace", args)
        },
        eventHoverHandling: "Disabled",
      },
    }
  },
  props: {
    startDate: String,
    duration: Number,
    events: Array,
  },
  components: {
    DayPilotCalendar
  },
  computed: {
    // DayPilot.Calendar object - https://api.daypilot.org/daypilot-calendar-class/
    calendar: function () {
      return this.$refs.calendar.control;
    }
  },
  methods: {
    generateCols() {
      const columns = []
      const start =  DayPilot.Date.parse(this.startDate, "yyyy-MM-dd")
      for (let i=0;i<this.$props.duration;++i) {
        const date = start.addDays(i).toString("yyyy-MM-dd")
        columns.push({id: date, name: date})
      }
      return columns
    },
  },
  mounted: function() {
  }
}
</script>

<style scoped>
#dp {
/* 50px + 100px * 5 */
  width: 570px;
}
</style>
