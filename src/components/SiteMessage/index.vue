<template>
  <div class="popover">
    <el-popover
      placement="bottom"
      width="400"
      trigger="click"
    >
      <el-empty v-if="value.length === 0" :image-size="50" />
      <template v-else>
        <el-table :data="value" :show-header="false" size="small" @row-click="redirectToMessageCenter">
          <el-table-column v-slot="scope" fixed="left">
            <router-link to="/message/my">
              <h6 style="margin: 0">{{ scope.row.title }}</h6>
              <div>{{ UtilsDateFormat.fromParse(scope.row.datetime).toDateTimeString() }}</div>
            </router-link>
          </el-table-column>
        </el-table>
        <router-link to="/message/my">
          <div>查看更多</div>
        </router-link>
      </template>
      <el-badge slot="reference" is-dot class="item" :hidden="value.length <= 0">
        <i class="el-icon el-icon-bell" />
      </el-badge>
    </el-popover>
<!--    dropdown 样式-->
<!--    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">-->
<!--      <div>-->
<!--        <i v-if="value.length === 0" class="el-icon el-icon-bell" />-->
<!--        <el-badge v-else v-slot="reference" class="item">-->
<!--          <i class="el-icon el-icon-bell" />-->
<!--        </el-badge>-->
<!--      </div>-->
<!--      <el-dropdown-menu width="400">-->
<!--        <template v-for="msg in value">-->
<!--          <router-link :key="msg.title" to="/message">-->
<!--            <el-dropdown-item>-->
<!--              <h6 style="margin: 0">{{ msg.title }}</h6>-->
<!--              <div>{{ UtilsDateFormat.fromParse(msg.dateTime).toDateTimeString() }}</div>-->
<!--            </el-dropdown-item>-->
<!--          </router-link>-->
<!--        </template>-->
<!--        <router-link to="/message">-->
<!--          <el-dropdown-item>查看更多</el-dropdown-item>-->
<!--        </router-link>-->
<!--      </el-dropdown-menu>-->
<!--    </el-dropdown>-->
  </div>
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
  name: 'SiteMessage',
  // props: ['value'],
  data() {
    return {
      value: []
    }
  },
  computed: {
    UtilsDateFormat() {
      return UtilsDateFormat
    }
  },
  created() {
    this.value.push(new Message('first'))
    this.value.push(new Message('second'))
    this.getMessages()
  },
  methods: {
    getMessages() {
      // const evtSource = new EventSource('/api/message', { withCredentials: true })
      // evtSource.onmessage = function(event) {
      //   this.value.push(event.data)
      // }
    },
    redirectToMessageCenter(row, column, event) {

    }
  }
}
</script>

<style scoped>
  .popover {
    padding: 0;
  }
  div >>> .el-popover {
    padding: 0;
  }
</style>
