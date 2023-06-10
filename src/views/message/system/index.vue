<template>
  <el-card style="margin: 10px">
    <div slot="header">
      <span>我的消息</span>
    </div>
    <el-table :loading="loading" :data="data" :sortable="false" @row-click="showMessage">
      <el-table-column show-overflow-tooltip sortable label="标题" prop="title" />
      <el-table-column v-slot="scope" show-overflow-tooltip sortable label="时间">
        <el-tag type="primary" size="mini">{{ UtilsDateFormat.fromParse(scope.row.dateTime).toDateTimeString() }}</el-tag>
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable label="类型" prop="type" />
    </el-table>
    <el-drawer :title="message.title" :visible.sync="messageVisit" direction="ttb">

    </el-drawer>

<!--    <el-row>-->
<!--      <el-col :span="4">-->
<!--        <el-table>-->
<!--          <el-table-column></el-table-column>-->
<!--        </el-table>-->
<!--      </el-col>-->
<!--      <el-col :span="8">-->

<!--      </el-col>-->
<!--    </el-row>-->
  </el-card>
</template>

<script>
import { UtilsDateFormat } from '@/utils/date'

class Message {
  constructor(title = '', dateTime = '') {
    this.title = title
    this.dateTime = dateTime
  }
}

export default {
  name: 'Message',
  data() {
    return {
      loading: false,
      messageVisit: false,
      message: new Message('test', ''),
      data: []
    }
  },
  computed: {
    UtilsDateFormat() {
      return UtilsDateFormat
    }
  },
  created() {
    this.getMessages()
  },
  methods: {
    getMessages() {
      this.loading = true
      this.loading = false
    },
    showMessage(row, column, event) {
      this.messageVisit = true
      this.message = row
    }
  }
}
</script>

<style scoped>

</style>
