<template>
  <FullCalendar
    class='demo-app-calendar'
    :options='calendarOptions'
  >
    <template v-slot:eventContent='arg'>
      <b>{{ arg.timeText }}</b>
      <i>{{ arg.event.title }}</i>
    </template>
  </FullCalendar>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
export default {

  components: {
    FullCalendar // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: JSON.parse(localStorage.getItem('CalendarEvents')), // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: []
    }
  },

  methods: {

    handleWeekendsToggle () {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },

    handleDateSelect (selectInfo) {
      const title = prompt('请为您的日程输入一个标题')
      const calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      const event_ = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }
      if (title) {
        calendarApi.addEvent(event_)
      }
      let saveEvents = JSON.parse(localStorage.getItem('CalendarEvents'))
      if (!saveEvents && typeof (saveEvents) !== 'undefined') {
        saveEvents = []
      }
      if (event_.title) {
        saveEvents.push(event_)
      }
      localStorage.setItem('CalendarEvents', JSON.stringify(saveEvents))
    },

    handleEventClick (clickInfo) {
      if (confirm(`您确定要删除该日程吗 '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },

    handleEvents (events) {
      this.currentEvents = events
    }
  }
}
</script>

<style lang='css'>

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

</style>
