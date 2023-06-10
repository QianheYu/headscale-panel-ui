<template>
  <div>
    <el-card class="statistic">
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-statistic group-separator="," :precision="2" title="服务以连续运行">
              <template slot="formatter" style="margin-top: 2px">{{ formatDuration(uptime) }}</template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic title="Headscale状态">
              <template slot="formatter">
                <el-tag style="margin-right: 4px" size="small" :type="headscale.status < 0?'success':'danger'">{{ toStatus(headscale.status) }}</el-tag>
                <el-tag style="margin-right: 4px" size="small" type="primary">{{ headscale.version }}</el-tag>
                <el-tooltip v-if="headscale.last_version.length > 0 && headscale.last_version !== headscale.version">
                  <template slot="content">点击更新至{{headscale.new_version}}</template>
                  <el-tag size="small" type="primary">发现新版本</el-tag>
                </el-tooltip>
                <el-tooltip v-else>
                  <template slot="content">点击回滚到旧版本</template>
                  <el-tag size="small" type="danger">回滚</el-tag>
                </el-tooltip>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic group-separator="," :precision="2" decimal-separator="." title="服务器时间">
              <template slot="formatter">{{ UtilsDateFormat.fromParse(time).toDateTimeString() }}</template>
              <!--            <template slot="prefix">-->
              <!--              <i class="el-icon-s-flag" style="color: red"></i>-->
              <!--            </template>-->
              <!--            <template slot="suffix">-->
              <!--              <i class="el-icon-s-flag" style="color: blue"></i>-->
              <!--            </template>-->
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic :value="520" title="已传输流量">
              <template slot="formatter">
                <div><i class="el-icon el-icon-top" />{{ UtilsDataFormat(traffic.sent) }}
                   <i class="el-icon el-icon-bottom" />{{ UtilsDataFormat(traffic.received) }}</div>
              </template>
              <!--              <template slot="suffix">-->
              <!--              <span class="like">-->
              <!--                <i class="el-icon-star-on" style="color:red" v-show="true"></i>-->
              <!--&lt;!&ndash;                <i class="el-icon-star-off" v-show="!like"></i>&ndash;&gt;-->
              <!--              </span>-->
              <!--              </template>-->
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

import { UtilsDataFormat } from '@/utils/dataSize'
import { formatDuration, UtilsDateFormat } from '@/utils/date'

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['uptime', 'time', 'traffic', 'headscale', 'cpu', 'memory', 'disk', 'network', 'swap'],
  data() {
    return {
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
    },
    // eslint-disable-next-line vue/return-in-computed-property
    setPerformance() {
      const size = document.querySelector('#app > div > div.main-container > section > div > div > div:nth-child(2) > div.performance.el-row > div:nth-child(2) > div > div > div:nth-child(3)').size()
      console.debug(size)
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
  margin-bottom: 24px;
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
  line-height: 30px;
  font-size: 12px;
  //color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
}
</style>
