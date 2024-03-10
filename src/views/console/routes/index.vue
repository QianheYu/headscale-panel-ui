<template>
  <div>
    <el-card style="margin: 10px">
      <el-form size="mini" :inline="true" class="demo-form-inline">
        <el-form-item :label="$t('console.routes.route')">
          <el-input v-model="search_route" :placeholder="$t('console.routes.route')" />
        </el-form-item>
        <el-form-item :label="$t('console.routes.machine')">
          <el-input v-model="search_machine" :placeholder="$t('console.routes.machine')" />
        </el-form-item>
        <el-form-item :label="$t('normal.status')">
          <el-select v-model="search_status" :placeholder="$t('console.routes.placeholder.status')">
            <el-option value="" :label="$t('console.routes.all')" />
            <el-option value="connected" :label="$t('console.routes.connected')" />
            <el-option value="disconnected" :label="$t('console.routes.disconnected')" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('console.routes.switch')">
          <el-select v-model="search_enable" :placeholder="$t('console.routes.placeholder.switch')">
            <el-option value="" :label="$t('console.routes.all')" />
            <el-option value="enabled" :label="$t('normal.enable')" />
            <el-option value="disabled" :label="$t('normal.disable')" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('console.routes.availability')">
          <el-select v-model="search_advertised" :placeholder="$t('console.routes.placeholder.advertised')">
            <el-option value="" :label="$t('console.routes.all')" />
            <el-option value="available" :label="$t('console.routes.available')" />
            <el-option value="unavailable" :label="$t('console.routes.unavailable')" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-search" type="primary" @click="search">{{ $t('normal.search') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column show-overflow-tooltip sortable prop="prefix" :label="$t('console.routes.route')" align="center" />
        <el-table-column show-overflow-tooltip sortable label="Via" align="center">
          <template v-slot="scope">
            <div v-for="ip in scope.row.node.ip_addresses" :key="ip">{{ ip }}</div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="node.given_name" :label="$t('console.routes.machine')" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="node.name" :label="$t('console.routes.hostname')" align="center" />
        <el-table-column show-overflow-tooltip sortable :label="$t('console.routes.lastSeen')" align="center">
          <template v-slot="scope">
            <el-tag size="small" :type="(typeof scope.row.node.online === 'undefined' ? scope.row.node.last_seen.seconds +60 >= Date.now()/1000 :scope.row.node.online) ? 'success':'danger'">
              {{ scope.row.node.online === true ? $t('console.routes.connected'): 'expiry' in scope.row.node ? UtilsDateFormat.fromTimeStamp(scope.row.node.last_seen).toAfterDateTimeString():$t('console.routes.disconnected') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable :label="$t('console.routes.createdAt')" align="center" min-width="110px">
          <template v-slot="scope">
            <el-tag type="primary" size="small">{{ UtilsDateFormat.fromTimeStamp(scope.row.created_at).toDateTimeString() }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip :label="$t('normal.status')" align="center">
          <template v-slot="scope">
            <el-switch v-model="scope.row.enabled" active-color="#13ce66" inactive-color="#ff4949" @change="submit($event, scope)" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center">
          <template v-slot="scope">
            <el-button size="small" type="danger" @click="deleteRoute(scope.row.id)"><i class="el-icon el-icon-delete" /></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { deleteRoute, getRoute, switchRoute } from '@/api/console/routes'
import { UtilsDateFormat as UtilDateTimeFormat, UtilsDateFormat } from '@/utils/date'

export default {
  name: 'Routes',
  data() {
    return {
      loading: false,
      tableData: [],
      routes: [],
      search_route: '',
      search_machine: '',
      search_status: '',
      search_enable: '',
      search_advertised: ''
    }
  },
  computed: {
    UtilDateTimeFormat() {
      return UtilDateTimeFormat
    },
    UtilsDateFormat() {
      return UtilsDateFormat
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    async getTableData() {
      this.loading = true
      const { code, data, message } = await getRoute({ node_id: 0 })
      this.loading = false
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.routes = data
      this.tableData = this.routes
    },
    async submit(event, scope) {
      const { code, message } = await switchRoute({ route_id: scope.row.id, enable: event })
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.$message.success('Success')
      if (scope.row.enabled) {
        this.routes[scope.$index].enabled = true
      } else {
        delete this.routes[scope.$index].enabled
      }
    },
    async deleteRoute(id) {
      this.$confirm(this.$t('console.routes.message.confirmDeletion'), this.$t('console.routes.message.prompt'), {
        type: 'warning'
      }).then(async() => {
        const { code, message } = await deleteRoute({ route_id: id })
        if (code !== 200) {
          this.$message.error(message)
          return
        }
        await this.getTableData()
      }).catch(() => {
      })
    },
    search() {
      let all_status = false
      let online_status = false
      let all_enabled = false
      let enabled = false
      let available = false
      let all_available = false
      switch (this.search_status) {
        case 'connected':
          online_status = true
          break
        case 'disconnected':
          online_status = false
          break
        default:
          all_status = true
          break
      }

      switch (this.search_enable) {
        case 'enabled':
          enabled = true
          break
        case 'disabled':
          enabled = false
          break
        default:
          all_enabled = true
          break
      }

      switch (this.search_advertised) {
        case 'available':
          available = true
          break
        case 'unavailable':
          available = false
          break
        default:
          all_available = true
          break
      }
      console.debug({
        status: {
          all: all_status,
          online: online_status
        },
        enable: {
          all: all_enabled,
          enabled: enabled
        },
        available: {
          all: all_available,
          available: available
        }
      })
      this.tableData = this.routes.filter((obj) => (
        ('given_name' in obj.machine && this.search_machine.length > 0 ? obj.machine.given_name.startsWith(this.search_machine) : true) &&
        // ('given_name' in obj.machine && obj.machine.given_name.startsWith(this.search_machine)) &&
        obj.prefix.startsWith(this.search_route) &&
        (all_status || 'online' in obj.machine === online_status) &&
        (all_enabled || 'enabled' in obj === enabled) &&
        (all_available || obj.advertised === available)
      ))
    }
  }
}
</script>

<style scoped lang="scss">

</style>
