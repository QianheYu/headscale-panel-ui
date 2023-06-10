<template>
  <div class="statistic">
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <el-statistic>
            <template slot="title">
              <div style="font-size: 22px; margin-bottom: 10px !important;">{{ $t('dashboard.static.headscaleStatus') }}</div>
            </template>
            <template slot="formatter">
              <template v-if="headscale.version.length > 0">
                <el-tooltip v-if="headscale.status > 0" placement="top">
                  <template slot="content">{{ headscale.error }}</template>
                  <el-tag class="tag-hand" style="margin-right: 4px;line-height: 22px !important;" size="small" type="danger">{{ toStatus(headscale.status) }}</el-tag>
                </el-tooltip>
                <el-tag v-else class="tag-hand" style="margin-right: 4px;line-height: 22px !important;" size="small" :type="headscale.status < 0?'success':'danger'">{{ toStatus(headscale.status) }}</el-tag>
                <el-tag class="tag-hand" style="margin-right: 4px;line-height: 22px !important;" size="small" type="primary" @click="getVersions">{{ headscale.version }}</el-tag>
                <el-tooltip v-if="headscale.last_version.length > 0 && !headscale.last_version.includes(headscale.version)">
                  <template slot="content">{{ $t('dashboard.static.updateTo') }}{{ headscale.last_version }}</template>
                  <el-popconfirm :title="$t('dashboard.static.message.update.confirm')" @confirm="update">
                    <el-tag slot="reference" class="tag-hand" style="line-height: 22px !important;" size="small" type="primary">{{ $t('dashboard.static.newVersionFound') }}</el-tag>
                  </el-popconfirm>
                </el-tooltip>
              </template>
              <template v-else>
                <el-tag class="tag-hand" v-if="headscale.status < 0" style="margin-right: 4px;line-height: 22px !important;" size="small" type="success">{{ $t('dashboard.static.connected') }}</el-tag>
                <el-tag v-else class="tag-hand" style="margin-right: 4px;line-height: 22px !important;" size="small" type="danger">{{ $t('dashboard.static.disconnected') }}</el-tag>
              </template>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic group-separator="," :precision="2">
            <template slot="title">
              <div style="font-size: 22px; margin-bottom: 10px !important;">{{ $t('dashboard.static.serverContinuousRunning') }}</div>
            </template>
            <template slot="formatter" style="margin-top: 2px">{{ formatDuration(uptime) }}</template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic group-separator="," :precision="2" decimal-separator=".">
            <template slot="title">
              <div style="font-size: 22px; margin-bottom: 10px !important;">{{ $t('dashboard.static.serverTime') }}</div>
            </template>
            <template slot="formatter">{{ UtilsDateFormat.fromParse(time).toDateTimeString() }}</template>
<!--                        <template slot="prefix">-->
<!--                          <i class="el-icon-s-flag" style="color: red"></i>-->
<!--                        </template>-->
<!--                        <template slot="suffix">-->
<!--                          <i class="el-icon-s-flag" style="color: blue"></i>-->
<!--                        </template>-->
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic :value="520">
            <template slot="title">
              <div style="font-size: 22px; margin-bottom: 10px !important;">{{ $t('dashboard.static.totalNetworkCardTraffic') }}</div>
            </template>
            <template slot="formatter">
              <div><i class="el-icon el-icon-top" />{{ UtilsDataFormat(traffic.sent) }}
                <i class="el-icon el-icon-bottom" />{{ UtilsDataFormat(traffic.received) }}</div>
            </template>
<!--                          <template slot="suffix">-->
<!--                          <span class="like">-->
<!--                            <i class="el-icon-star-on" style="color:red" v-show="true"></i>-->
<!--            &lt;!&ndash;                <i class="el-icon-star-off" v-show="!like"></i>&ndash;&gt;-->
<!--                          </span>-->
<!--                          </template>-->
          </el-statistic>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="请选择版本" :modal="true">
      <template v-if="loading">
        <i class="el-icon el-icon-loading" />
      </template>
      <template v-else>
        <el-row>
          <template v-for="version in versions">
            <el-col :key="version.tag_name" :xs="24" :sm="12" :md="6" :lg="4" style="border: 4px solid #fff">
              <el-tag type="primary" size="small" class="tag-hand" @click="selectVersion(version)">{{ version.tag_name }}</el-tag>
            </el-col>
          </template>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import { UtilsDataFormat } from '@/utils/dataSize'
import { formatDuration, UtilsDateFormat } from '@/utils/date'
import { install } from '@/api/dashboard/status'
import { Loading } from 'element-ui'

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['uptime', 'time', 'traffic', 'headscale', 'cpu', 'memory', 'disk', 'network', 'swap'],
  data() {
    return {
      loading: false,
      dialogVisible: false,
      versions: [],
      status: '',
      colors: [
        { color: '#f56c6c', percentage: 100 },
        { color: '#e6a23c', percentage: 80 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 20 }
        // { color: '#6f7ad3', percentage: 20 }
      ]
    }
  },
  computed: {
    UtilsDateFormat() {
      return UtilsDateFormat
    }
  },
  methods: { formatDuration, UtilsDataFormat,
    toStatus(value) {
      switch (value) {
        case -1:
          return 'Running'
        case 0:
          return 'Stop'
        case 1:
          return 'Error'
        default:
          return 'Unknown'
      }
    },
    async getVersions() {
      const loading = Loading.service({ fullscreen: true, lock: true, text: 'Loading' })
      const { code, data, message } = await install({ state: 'version' })
      if (code !== 200) {
        loading.close()
        this.$message.error(message)
        return
      }
      loading.close()
      this.versions = data
      this.dialogVisible = true
    },
    async selectVersion(version) {
      this.$confirm(this.$t('dashboard.static.message.install.confirm'), this.$t('dashboard.static.message.install.title') + ' ' + version.tag_name, {
        type: 'warning'
      }).then(async() => {
        const loading = Loading.service({ fullscreen: true, lock: true, text: 'Loading' })
        this.dialogVisible = false
        const { code, message } = await install({ state: 'install', id: version.id })
        if (code !== 200) {
          loading.close()
          this.$message.error(message)
          return
        }
        loading.close()
        this.$message.success(this.$t('dashboard.static.message.install.success'))
      }).catch(() => {
        // this.loading = false
      })
    },
    async update() {
      const { code, message } = await install({ state: 'upgrade' })
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      if (message.length > 0) {
        this.$message.warning(message)
      } else {
        this.$message.success(this.$t('dashboard.static.message.update.success'))
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .statistic {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    //padding: 24px;
    text-align: center;
    padding-bottom: 16px !important;
  }

  .performance {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    text-align: center;
  }

  .tag {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    background-color: #ecf5ff;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    //line-height: 30px;
    font-size: 12px;
    //color: #409eff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
  }
  .tag-hand:hover {
    cursor: pointer;
  }

</style>
