<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { UtilsDataUnitFormat } from '@/utils/dataSize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      max: 0,
      times: [],
      upload: [],
      download: [],
      uploadSpeed: [],
      downloadSpeed: [],
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        title: {
          text: this.$t('dashboard.network.realTimeNetworkSpeed')
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          padding: [5, 10],
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false
          },
          formatter: function(params) {
            var result = params[0].name + '<br/>'
            for (var i = 0; i < params.length; i++) {
              result += params[i].seriesName + ': ' + params[i].value + ' KB/s<br/>'
            }
            return result
          }
        },
        legend: {
          data: [this.$t('dashboard.network.uploadSpeed'), this.$t('dashboard.network.downloadSpeed')]
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} KB/s'
          }
        },
        series: [{
          smooth: true,
          name: this.$t('dashboard.network.uploadSpeed'),
          type: 'line',
          data: []
        }, {
          smooth: true,
          name: this.$t('dashboard.network.downloadSpeed'),
          type: 'line',
          data: []
        }]
      })
    },
    setOptions({ up, down } = {}) {
      const now = new Date()
      const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
      this.times.push(time)

      if (this.times.length > 20) {
        this.times.shift()
        this.upload.shift()
        this.download.shift()
      }

      this.upload.push(up)
      this.download.push(down)

      const index = Math.max(this.getMultiplier(...this.upload), this.getMultiplier(...this.download))
      this.uploadSpeed = this.upload.map(num => this.formatBytes(num, index))
      this.downloadSpeed = this.download.map(num => this.formatBytes(num, index))

      // this.uploadSpeed = this.upload.map(num => UtilsDataValueFormat(num))
      // this.downloadSpeed = this.download.map(num => UtilsDataValueFormat(num))

      var options = {
        xAxis: {
          data: [...this.times]
        },
        yAxis: {
          axisLabel: {
            formatter: `{value} ${UtilsDataUnitFormat(Math.max(...this.upload, ...this.download))}/s`
            // formatter: `{value} ${UtilsDataUnitFormat(up)}/s`
          }
        },
        series: [{
          name: this.$t('dashboard.network.uploadSpeed'),
          data: [...this.uploadSpeed]
        }, {
          name: this.$t('dashboard.network.downloadSpeed'),
          data: [...this.downloadSpeed]
        }]
      }
      this.chart.setOption(options)
    },
    getMultiplier(...bytes) {
      const max = Math.max(...bytes)
      if (max === 0) return 0
      const k = 1024
      return Math.floor(Math.log(max) / Math.log(k))
    },
    formatBytes(bytes, index = 0, decimals = 2) {
      if (bytes === 0) return 0
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      // const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      // const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, index)).toFixed(dm))
    }
  }
}
</script>
