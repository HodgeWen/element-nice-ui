import Vue from 'vue'
export interface ElPaginationProps {
  currentPage?: number
  pageCount?: number
  pagerCount?: number
  disabled?: boolean
}
export declare class ElPagination extends Vue {
  $props: ElPaginationProps
}
export default ElPagination
