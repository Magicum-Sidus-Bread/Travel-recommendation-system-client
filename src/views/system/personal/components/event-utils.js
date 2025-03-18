
let eventGuid = 0
// const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: todayStr
  // },
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   start: todayStr + 'T12:00:00'
  // }
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   end: '2022-11-12T18:00:00',
  //   start: '2022-11-12T16:00:00'
  // }
]
export function createEventId () {
  return String(eventGuid++)
}
