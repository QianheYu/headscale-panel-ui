<template>
  <div>
    <el-card style="margin: 10px">
      <el-form size="mini" :inline="true" class="demo-form-inline">
        <el-form-item :label="$t('console.machines.name')">
          <el-input v-model="search_machine" :placeholder="$t('console.machines.name')" />
        </el-form-item>
        <el-form-item :label="$t('console.machines.ip')">
          <el-input v-model="search_ip" :placeholder="$t('console.machines.ip')" />
        </el-form-item>
        <el-form-item :label="$t('normal.status')">
          <el-select v-model="search_status" :placeholder="$t('normal.status')">
            <el-option value="" :label="$t('console.machines.all')" />
            <el-option value="connected" :label="$t('console.machines.connected')" />
            <el-option value="disconnected" :label="$t('console.machines.disconnected')" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('account.user')">
          <el-input v-model="search_user" :placeholder="$t('account.username')" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-search" type="primary" @click="search">{{ $t('normal.search') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-plus" type="warning" @click="registerMachineVisible = true">{{ $t('normal.create') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="tableData" @row-click="showInfo">
        <el-table-column show-overflow-tooltip sortable prop="given_name" :label="$t('console.machines.name')" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="ip_addresses" :label="$t('console.machines.ip')" align="center">
          <template v-slot="scope">
            <div v-for="ip in scope.row.ip_addresses" :key="ip">{{ ip }}</div>
          </template>
        </el-table-column>
        <!--        <el-table-column show-overflow-tooltip sortable prop="os" label="OS" align="center" />-->
        <el-table-column show-overflow-tooltip sortable prop="lastSeen" :label="$t('console.machines.lastSeen')" align="center">
          <template v-slot="scope">
            <el-tag size="small" :type="scope.row.online ? 'success':'danger'">{{ scope.row.online === true ? $t('console.machines.connected'): UtilDateFormat.fromTimeStamp(scope.row.last_seen).toAfterDateTimeString() }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="creator" :label="$t('console.machines.creator')" align="center">
          <template v-slot="scope">
            <div>{{ scope.row.user.name }}</div>
          </template>
        </el-table-column>
        <!--        <el-table-column show-overflow-tooltip sortable prop="user.name" label="Creator" align="center">-->
        <el-table-column fixed="right" align="left">
          <template v-slot="scope">
            <el-dropdown trigger="click" @command="operate($event, scope.row)">
              <span class="el-dropdown-link" style="color: #1890ff;">
                <!--                Operate -->
                <i class="el-icon el-icon-more" />
              </span>
              <el-dropdown-menu v-slot="dropdown">
                <el-dropdown-item v-if="permission" command="tags"><i class="el-icon-price-tag el-icon" />{{ $t('normal.tag') }}</el-dropdown-item>
                <el-dropdown-item v-if="permission" command="move"><i class="el-icon-rank el-icon" />{{ $t('normal.move') }}</el-dropdown-item>
                <el-dropdown-item command="expire"><i class="el-icon el-icon-refresh" />{{ $t('normal.expire') }}</el-dropdown-item>
                <el-dropdown-item command="delete" style="color: red"><i class="el-icon-delete el-icon" />{{ $t('normal.delete') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="$t('console.machines.registerMachine')" :visible.sync="registerMachineVisible" :width="$device.mobile || $device.ipad || $device.android ? '90%' : '30%'">
      <el-form size="small" label-width="100px">
        <el-form-item :label="$t('console.machines.nodekey')">
          <el-input v-model="nodekey" size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="registerMachineVisible = false; nodekey = '';">{{ $t('normal.cancel') }}</el-button>
        <el-button size="mini" type="primary" @click="registerMachine">{{ $t('normal.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="info.given_name" :visible.sync="machineInfoVisible" @close="renameButton=false">
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item :label="$t('console.machines.machine')">
          <template v-if="!renameButton">{{ info.given_name }}</template>
          <template v-else>
            <el-input v-model.trim="info.given_name" size="small" :placeholder="$t('console.machines.placeholder.lowercase')" @change="info.given_name = info.given_name.toLowerCase()">
              <el-button slot="append" type="primary" icon="el-icon-close" @click="info.given_name = info.temp; renameButton = false">
                {{ $t('normal.cancel') }}</el-button>
              <el-button slot="append" type="primary" icon="el-icon-check" @click="renameMachine(info.id, info.given_name)">
                {{ $t('normal.ok') }}</el-button>
            </el-input>
          </template>
          <template>
            <i v-if="!renameButton" class="el-icon el-icon-edit" @click="renameButton = true" />
          </template>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('console.machines.hostname')">{{ info.name }}</el-descriptions-item>
        <el-descriptions-item :label="$t('console.machines.ip')">
          <div v-for="ip in info.ip_addresses" :key="ip">{{ ip }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('normal.tag')">
          <el-select v-model="info.forced_tags" size="small" multiple filterable allow-create disabled>
            <!--            <template v-for="tag in tags">-->
            <!--              <el-option :key="tag" :value="tag" :label="tag" />-->
            <!--            </template>-->
            <!--            <el-option v-for="tag in tags" :key="tag" :value="tag" :label="tag" />-->
            <el-option v-for="tag in info.forced_tags" :key="tag" :value="tag" :label="tag" />
          </el-select>
          <!--          <div v-for="tag in info.forced_tags" :key="tag">{{ tag }}</div>-->
        </el-descriptions-item>
        <el-descriptions-item :label="$t('console.machines.lastSeen')">
          <el-tag size="small" :type="info.online? 'success':'danger'">{{ info.online? 'Connected': UtilsDateFormat.fromTimeStamp(info.last_seen).toAfterDateTimeString() }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('normal.update')">
          <el-tag size="small" :type="info.online?'success':'danger'">{{ UtilsDateFormat.fromTimeStamp(info.last_successful_update).toDateTimeString() }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('normal.expireTime')">
          <el-tag size="small" :type="UtilsDateFormat.fromTimeStamp(info.expiry).after()?'primary':'danger'">{{ UtilsDateFormat.fromTimeStamp(info.expiry).isMin()?$t('console.machines.neverExpire'):UtilsDateFormat.fromTimeStamp(info.expiry).toDateTimeString() }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('console.machines.registerMethod')">
          <el-tag v-if="'register_method' in info" size="small" type="success">{{ info.register_method }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="'pre_auth_key' in info" :label="$t('console.machines.preAuthKey')">
          <el-input size="small" :value="info.pre_auth_key.key" readonly />
        </el-descriptions-item>
        <el-descriptions-item v-if="routes.length > 0" :label="$t('console.machines.route')">
          <div v-for="(route, index) in routes" :key="index">
            {{ route.prefix }}
            <el-switch v-model="route.enabled" active-color="#13ce66" inactive-color="#ff4949" :disabled="!route.advertised" @change="switchRoute($event, index)" />
            <el-tooltip v-if="!route.advertised" class="item" effect="dark" :content="$t('console.machines.message.routeUnavailable')" placement="top">
              <i class="el-icon el-icon-question" />
            </el-tooltip>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <el-dialog :title="$t('console.machines.setTags')+' '+ setTagDialog.machine.given_name" :visible.sync="setTagVisible" :width="$device.mobile || $device.ipad || $device.android ? '90%' : '30%'">
      <el-form v-model="setTagDialog.machine">
        <el-form-item :label="$t('normal.tag')">
          <el-select v-model.trim="setTagDialog.machine.forced_tags" filterable allow-create multiple :placeholder="$t('console.machines.placeholder.chooseTags')" style="width:100%">
            <el-option
              v-for="item in setTagDialog.machine.forced_tags"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="setTagDialog.machine.forced_tags = setTagDialog.temp;setTagVisible = false">{{ $t('normal.cancel') }}</el-button>
        <el-button type="primary" size="small" @click="updateTags">{{ $t('normal.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('console.machines.moveMachine')+' ' + info.given_name" :visible.sync="moveMachineVisible" :width="$device.mobile || $device.ipad || $device.android ? '90%' : '30%'">
      <el-form>
        <el-select v-model="username" filterable remote :remote-method="searchUser" style="width: 100%">
          <el-option v-for="user in users" :key="user.username" :value="user.username">{{ user.username }}</el-option>
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="username='';moveMachineVisible = false">{{ $t('normal.cancel') }}</el-button>
        <el-button type="primary" size="small" @click="moveMachine">{{ $t('normal.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import { deleteMachine, getMachines, moveMachine, postMachine, updateTags } from '@/api/console/machines'
import { Machine } from '@/views/console/machines/mixins/data'
import { getRoute, switchRoute } from '@/api/console/routes'
import { UtilsDateFormat as UtilDateFormat, UtilsDateFormat } from '@/utils/date'
import { getUsers } from '@/api/system/user'

export default {
  name: 'Machines',
  data() {
    return {
      loading: false,
      registerMachineVisible: false,
      machineInfoVisible: false,
      setTagVisible: false,
      moveMachineVisible: false,
      renameButton: false,
      tableData: [],
      machines: [],
      info: new Machine(), // used by infoDialog and moveMachineDialog
      routes: [], // used by infoDialog
      setTagDialog: { machine: new Machine(), temp: [] }, // used by setTagDialog
      nodekey: '', // used by new machine
      search_machine: '',
      search_ip: '',
      search_status: '',
      search_user: '',
      permission: true, // used by move machine and set tags
      username: '', // used by move machine
      users: [], // used by move machine and check the user weather has permission to move the machine
      params: { // used to search users
        username: '',
        nickname: '',
        status: '',
        mobile: '',
        email: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    UtilDateFormat() {
      return UtilDateFormat
    },
    UtilsDateFormat() {
      return UtilsDateFormat
    }
  },
  created() {
    this.getTableData()
    // this.sortMachines()
    this.searchUser()
    this.polling = setInterval(() => {
      this.getTableData()
    }, 60000)
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  methods: {
    sortMachines() {
      this.machines.sort((a, b) => a.given_name.localeCompare(b.given_name))
    },
    async getTableData() {
      this.loading = true
      const { code, data, message } = await getMachines()
      this.loading = false
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.machines = data
      this.tableData = this.machines
    },
    async showInfo(row, column, event) {
      if (!('label' in column) || column.label === undefined) {
        return
      }
      this.info = { ...row, temp: row.given_name }
      const { code, data, message } = await getRoute({ machine_id: this.info.id })
      if (code !== 200) {
        this.$message.error(message)
      } else if (data !== null && data.length > 0) {
        this.routes = data
      }
      this.machineInfoVisible = true
    },
    async updateTags() {
      if (!this.setTagDialog.machine.forced_tags.every((str) => str.startsWith('tag:'))) {
        this.$message.error(this.$t('console.machines.message.deviceTagMustStartWithTag'))
        return
      }
      const { code, message } = await updateTags({ machine_id: this.setTagDialog.machine.id, tags: this.setTagDialog.machine.forced_tags })
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.setTagVisible = false
    },
    operate(event, object) {
      switch (event) {
        case 'tags':
          this.showSetTagsDialog(object)
          break
        case 'move':
          this.info = object
          this.moveMachineVisible = true
          break
        case 'expire':
          this.expireMachine(object.id)
          break
        case 'delete':
          this.deleteMachine(object.id)
          break
        default:
          this.$message.error('option param error')
      }
    },
    async renameMachine(id, name) {
      const { code, message } = await postMachine({ state: 'rename', name: name, machine_id: id })
      if (code !== 200) {
        this.$message.error(message)
      }
      this.renameButton = false
      await this.getTableData()
    },
    showSetTagsDialog(object) {
      this.setTagDialog = { machine: object, temp: object.forced_tags }
      this.setTagVisible = true
    },
    async expireMachine(id) {
      const { code, message } = await postMachine({ state: 'expire', name: '', machine_id: id })
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      await this.getTableData()
    },
    async moveMachine() {
      if (!this.users.find((obj) => this.username === obj.username)) {
        this.$message.error(this.$t('console.machines.message.userNotSelectOrNotExist'))
        return
      }
      const { code, data, message } = await moveMachine({ user: this.username, machine_id: this.info.id })
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.info = data
      this.moveMachineVisible = false
    },
    async switchRoute(event, index) {
      const { code, message } = await switchRoute({ route_id: this.routes[index].id, enable: event })
      if (code !== 200) {
        this.$message.error(message)
        this.routes[index].enabled = !event
      }
    },
    deleteMachine(id) {
      this.$confirm(this.$t('console.machines.message.confirmDeletion'), this.$t('console.machines.message.prompt'), {
        type: 'warning'
      }).then(async() => {
        const { code, message } = await deleteMachine({ machine_id: id })
        if (code !== 200) {
          this.$message({ type: 'error', message: message })
        } else {
          this.$message({
            type: 'success',
            message: this.$t('console.machines.message.deleteMachineSuccess')
          })
          await this.getTableData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('console.machines.message.cancelDelete')
        })
      })
    },
    async registerMachine() {
      const { code, message } = await postMachine({ state: 'register', nodekey: this.nodekey, machine_id: 0 })
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.$message.success(this.$t('console.machines.message.addMachineSuccess'))
      this.nodekey = ''
      this.registerMachineVisible = false
      await this.getTableData()
    },
    async searchUser(query) {
      // console.debug(query)
      this.params.username = query
      try {
        const { data } = await getUsers(this.params)
        this.users = data.users
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    search() {
      if (this.machines === null) {
        return
      }

      let enable_all_status = false
      let online_status = false
      switch (this.search_status) {
        case 'connected':
          online_status = true
          break
        case 'disconnected':
          online_status = false
          break
        default:
          enable_all_status = true
          break
      }
      // this.tableData = this.machines.filter((obj) => (obj.given_name.startsWith(this.search_machine)))
      this.tableData = this.machines.filter((obj) => (obj.given_name.startsWith(this.search_machine) && (enable_all_status || 'online' in obj === online_status) && obj.ip_addresses.find((ip) => ip.startsWith(this.search_ip)) !== undefined && obj.user.name.startsWith(this.search_user)))
      // console.debug(this.machines.filter((obj) => (obj.given_name.startsWith(this.search_machine) && obj.ip_addresses.find((ip) => ip.startsWith(this.search_ip)) !== undefined)))
    }
  }
}
</script>

<style scoped>

</style>
