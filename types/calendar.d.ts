import Vue from 'vue'
export interface ElCalendarProps {
  value?: Date
  range?: any[]
  firstDayOfWeek?: number
}
export declare class ElCalendar extends Vue {
  $props: ElCalendarProps
}
export default ElCalendar
