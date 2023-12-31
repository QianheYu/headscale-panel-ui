<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="dashboard-editor-container">
      <statistic :traffic="status.net_traffic" :uptime="status.uptime" :headscale="status.headscale" :time="status.t" class="chart-wrapper" />
      <performance-group :load="status.load" :cpu="status.cpu" :memory="status.memory" :disk="status.disk_space" :swap="status.swap" :network="status.net_io" class="chart-wrapper" />
      <el-row style="background-color: #fff; padding:16px 16px 0;margin-bottom: 32px">
        <network-speed-chart :chart-data="status.net_io" auto-resize />
      </el-row>
      <system-info-group v-model.trim="systemInfo" class="chart-wrapper" />
    </div>
  </div>
</template>

<script>
import { getStatus, getSystemInfo } from '@/api/dashboard/status'
import SystemInfoGroup from '@/views/dashboard/components/SystemInfoGroup.vue'
import PerformanceGroup from '@/views/dashboard/components/PerformanceGroup.vue'
import Statistic from '@/views/dashboard/components/Statistic.vue'
import NetworkSpeedChart from '@/views/dashboard/components/NetworkSpeedChart.vue'

export default {
  name: 'Dashboard',
  components: {
    Statistic,
    PerformanceGroup,
    SystemInfoGroup,
    NetworkSpeedChart
  },
  data() {
    return {
      loading: false,
      status: {
        headscale: { error: '', status: '', version: '', last_version: '' },
        disk_space: { total: 0, used: 0, free: 0, used_percent: 0 },
        memory: { total: 0, used: 0, free: 0, used_percent: 0 },
        swap: { used: 0, free: 0, total: 0, used_percent: 0 },
        cpu: { used_percent: 0 },
        load: { one: 0, five: 0, fifteen: 0 },
        net_traffic: { received: 0, sent: 0 },
        net_io: { up: 0, down: 0 },
        uptime: 0,
        t: '2006-01-01T10:00:00.000000000Z'
      },
      systemInfo: {}
    }
  },
  created() {
    this.getSystemInfo()
    this.getStatus()
    this.polling = setInterval(() => {
      this.getStatus()
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  methods: {
    async getSystemInfo() {
      const { code, data, message } = await getSystemInfo()
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.systemInfo = data
    },
    async getStatus() {
      const { code, data, message } = await getStatus()
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.status = data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    //padding: 32px;
    padding: 24px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      //margin-bottom: 32px;
      margin-bottom: 24px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

