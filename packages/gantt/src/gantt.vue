<template>
  <div class="el-gantt">
    <section class="el-gantt__tasks">
      <ul class="el-gantt__row" :style="{ height: '31px', 'line-height': '31px' }">
        <li v-for="column of columns" :key="column.prop">{{ column.label }}</li>
      </ul>
      <ul
        class="el-gantt__row"
        v-for="row of tasksWithId"
        :key="row._id"
        :style="{ height: '30px', 'line-height': '30px' }"
      >
        <li v-for="column of columns" :key="column.prop">{{ row[column.prop] }}</li>
      </ul>
    </section>

    <section class="el-gantt__wrap">
      <canvas class="el-gantt__container" ref="canvas" :width="width" :height="height"></canvas>
    </section>
  </div>
</template>

<script>
import { formatDate } from 'element-nice-ui/src/utils/date-util'
import { Canvas } from './canvas'
import { loop } from './utils'

export default {
  name: 'ElGantt',

  props: {
    tasks: {
      type: Array,
      required: true
    },

    columns: {
      type: Array,
      required: true
    }
  },

  data: () => {
    return {
      _canvas: null,

      mode: 'day',

      _seekId: 0,

      dayWidth: 80,

      taskHeight: 30,

      fontSize: 12
    }
  },

  computed: {
    tasksWithId() {
      return this.tasks.map(task => {
        task._id = this.$data._seekId++
        return task
      })
    },

    /**  最早时间 */
    earliestTimeStamp() {
      let result = Date.now()
      this.tasks.forEach(task => {
        result = Math.min(
          result,
          new Date(task.start).getTime(),
          new Date(task.actualStart).getTime()
        )
      })
      return result
    },
    /** 最晚时间 */
    latestTimeStamp() {
      let result = formatDate(new Date(), 'yyyyMMdd')
      this.tasks.forEach(task => {
        result = Math.max(result, new Date(task.end).getTime(), new Date(task.actualEnd).getTime())
      })
      return result
    },
    /** 总天数 */
    days() {
      return Math.ceil((this.latestTimeStamp - this.earliestTimeStamp) / 86400000)
    },

    width() {
      return this.days * this.dayWidth + 1
    },
    height() {
      return this.tasks.length * 30 + 1 + 60
    }
  },

  watch: {
    tasks() {
      this.render()
    }
  },

  methods: {
    render() {
      this.drawGrid()
    },

    /** 绘制日期 */
    drawDate() {
      /** @type { Canvas & CanvasRenderingContext2D } */
      const _canvas = this.$data._canvas



      // 绘制年月
      _canvas.drawManyLine({
        lines: [
          [[0.5, 0.5], [0.5  + this.days * this.dayWidth,  0.5]]
        ],
        style: {
          strokeStyle:  '#ddd'
        }
      })

      // 获取年月起始点
      // (this.latestTimeStamp - this.earliestTimeStamp)

     _canvas.drawManyLine({
        lines:
        [
          [[0.5, 0.5], [0.5,  30.5]],  // 第一条线

        ],

      })

      // 绘制天
      _canvas.drawGrid({
        left: 0.5,
        top: this.taskHeight + 0.5,
        colGap: this.dayWidth,
        rowGap: this.taskHeight,
        rowNumber: 1,
        colNumber: this.days,
      })

      _canvas.font = '24px serif'

      loop(this.days, (_, i) => {
        _canvas.fillText(
          formatDate(this.earliestTimeStamp + i * 86400000, 'dd'),
          this.dayWidth * i + 30,
          50
        )
      })
    },

    /**
     * 绘制网格起点
     */
    drawGrid() {
      /** @type { Canvas } */
      const _canvas = this.$data._canvas

      // 绘制日期
      this.drawDate()

      // 绘制任务网格
      _canvas.drawGrid({
        left: 0.5,
        top: 60.5,
        colGap: this.dayWidth,
        rowGap: 30,
        rowNumber: this.tasks.length,
        colNumber: this.days,
        style: {
          strokeStyle: '#ddd'
        }
      })
    }
  },

  mounted() {
    this.$data._canvas = new Canvas(this.$refs.canvas)
    this.render()
  }
}
</script>
