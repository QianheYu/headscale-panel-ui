<template>
  <div>
    <el-row class="performance">
      <el-col :span="6">
        <el-progress type="dashboard" :percentage="parseFloat(cpu.used_percent.toFixed(2))" :color="colors" show-text @format="show" />
        <div>CPU</div>
      </el-col>
      <el-col :span="6">
        <el-progress type="dashboard" :percentage="parseFloat(memory.used_percent.toFixed(2))" :color="colors" />
        <div>Memory</div>
        <div>{{ UtilsDataFormat(memory.used) }}/{{ UtilsDataFormat(memory.total) }}</div>
      </el-col>
      <el-col :span="6">
        <el-progress type="dashboard" :percentage="parseFloat(disk.used_percent.toFixed(2))" :color="colors" />
        <div>Disk</div>
        <div>{{ UtilsDataFormat(disk.used) }}/{{ UtilsDataFormat(disk.total) }}</div>
      </el-col>
      <el-col :span="6">
        <el-progress type="dashboard" :percentage="parseFloat(swap.used_percent.toFixed(2))" :color="colors" />
        <div>Swap</div>
        <div>{{ UtilsDataFormat(swap.used) }}/{{ UtilsDataFormat(swap.total) }}</div>
      </el-col>
    </el-row>
    <el-row class="performance" style="padding-top: 16px">
      <el-col :span="12">
        <div>
<!--          <el-row>-->
<!--            <el-col :span="6">Load:</el-col>-->
<!--            <el-col :span="6">{{ load.one }}</el-col>-->
<!--            <el-col :span="6">{{ load.five }}</el-col>-->
<!--            <el-col :span="6">{{ load.fifteen }}</el-col>-->
<!--          </el-row>-->
          <span>Load</span>
          {{ load.one }} | {{ load.five }} | {{ load.fifteen }}
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <span>Network Speed:</span>
          <svg-icon icon-class="upload-svgrepo-com" /> {{ UtilsDataFormat(network.up) }}
          <svg-icon icon-class="download-svgrepo-com" /> {{ UtilsDataFormat(network.down) }}
        </div>
<!--        <div>-->
<!--&lt;!&ndash;          <span>NetSpeed</span>&ndash;&gt;-->
<!--          <el-row>-->
<!--            <el-col :span="8">Network Speed:</el-col>-->
<!--            <el-col :span="8">-->
<!--              <svg-icon icon-class="upload-svgrepo-com" /> {{ UtilsDataFormat(network.up) }}-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <svg-icon icon-class="download-svgrepo-com" /> {{ UtilsDataFormat(network.down) }}-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { UtilsDataFormat } from '@/utils/dataSize'

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['load', 'cpu', 'memory', 'disk', 'swap', 'network'],
  data() {
    return {
      colors: [
        { color: '#f56c6c', percentage: 100 },
        { color: '#e6a23c', percentage: 80 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 20 }
        // { color: '#6f7ad3', percentage: 20 }
      ]
      // cpu: {},
      // memory: {},
      // disk: {},
      // network: {},
      // swap: {}
    }
  },
  watch: {
    cpu(cpu) {
      this.cpu = cpu
    },
    memory(memory) {
      this.memory = memory
    },
    disk(disk) {
      this.disk = disk
    },
    swap(swap) {
      this.swap = swap
    }
  },
  methods: {
    UtilsDataFormat,
    show(percentage) {
      return `${percentage}%`
    }
  }
}
</script>

<style scoped lang="scss">
.performance {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  text-align: center;
  padding-bottom: 16px;
}
</style>
