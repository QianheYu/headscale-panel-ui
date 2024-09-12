<template>
  <div style="margin: 0">
    <el-tabs type="border-card" style="margin: 10px">
      <el-tab-pane label="PreAuthKey">
        <el-form size="mini" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-checkbox-group v-model="checkboxes" @change="filterPreAuthKey">
              <el-checkbox-button border :label="$t('console.settings.preAuthKey.hiddenExpiredKeys')" />
              <el-checkbox-button border :label="$t('console.settings.preAuthKey.hiddenUsedKeys')" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" icon="el-icon-plus" type="warning" @click="preAuthKeyVisible = true">{{ $t('normal.create') }}</el-button>
          </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="tableData" header-align="center" tooltip-effect="dark" @row-click="handleClickRow">
          <el-table-column show-overflow-tooltip prop="key" :label="$t('console.settings.preAuthKey.key')" align="center" />
          <el-table-column v-slot="scope" show-overflow-tooltip :label="$t('console.settings.preAuthKey.reUsable')" align="center">
            <el-tag size="small" :type="scope.row.reusable?'success':'danger'">{{ scope.row.reusable?$t('normal.yes'):$t('normal.no') }}</el-tag>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center">
            <template slot="header">
              <el-tooltip :content="$t('console.settings.preAuthKey.ephemeralTooltip')" placement="top">
                <span>{{ this.$t('console.settings.preAuthKey.ephemeral') }}<i class="el-icon-question" /></span>
              </el-tooltip>
            </template>
            <template v-slot="scope">
              <el-tag size="small" :type="scope.row.used?'danger':'success'">{{ scope.row.used?$t('normal.no'):$t('normal.yes') }}</el-tag>
            </template>
          </el-table-column>
          <!--          <el-table-column v-slot="scope" show-overflow-tooltip :label="$t('console.settings.preAuthKey.ephemeral')" align="center">-->
          <!--            <el-tag size="small" :type="scope.row.ephemeral?'success':'danger'">{{ scope.row.ephemeral?$t('normal.yes'):$t('normal.no') }}</el-tag>-->
          <!--          </el-table-column>-->
          <el-table-column v-slot="scope" show-overflow-tooltip :label="$t('console.settings.preAuthKey.used')" align="center">
            <el-tag size="small" :type="scope.row.used?'success':'danger'">{{ scope.row.used?$t('normal.yes'):$t('normal.no') }}</el-tag>
          </el-table-column>
          <el-table-column v-slot="scope" show-overflow-tooltip sortable prop="expire" :label="$t('normal.expireTime')" align="center">
            <el-tag size="small" :type="UtilsDateFormat.fromTimeStamp(scope.row.expiration).after()?'primary':'danger'">{{ UtilsDateFormat.fromTimeStamp(scope.row.expiration).toDateTimeString() }}</el-tag>
          </el-table-column>
          <!--<el-table-column show-overflow-tooltip sortable prop="create_at" label="CreateAt" align="center" />-->
          <!--<el-table-column show-overflow-tooltip sortable prop="acl_tags" label="Tags" align="center" />-->
          <el-table-column show-overflow-tooltip prop="operate" align="center">
            <template v-slot="scope">
              <el-button size="mini" type="danger" :disabled="!UtilsDateFormat.fromTimeStamp(scope.row.expiration).after()" @click="expirePreAuthKey(scope.row)">Expire</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!--  Dialog-->
    <el-dialog :title="$t('normal.create')+'PreAuthKey'" :visible.sync="preAuthKeyVisible" :width="$device.mobile || $device.ipad || $device.android ? '90%' : '30%'">
      <el-form size="small" label-width="100px" :rules="preAuthKeysDialog.rule()">
        <el-form-item :label="$t('normal.expireTime')">
          <el-date-picker
            v-model="preAuthKeysDialog.expire"
            type="datetime"
            :picker-options="pickerOptions"
            :placeholder="$t('console.settings.preAuthKey.chooseDate')"
            align="bottom"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="preAuthKeysDialog.reusable" :label="$t('console.settings.preAuthKey.reUsable')" />
          <el-checkbox v-model="preAuthKeysDialog.ephemeral">
            <el-tooltip :content="$t('console.settings.preAuthKey.ephemeralTooltip')" placement="top">
              <span>{{ this.$t('console.settings.preAuthKey.ephemeral') }}<i class="el-icon-question" /></span>
            </el-tooltip>
          </el-checkbox>
        </el-form-item>
        <el-form-item :label="'ACL'+$t('normal.tag')">
          <el-select v-model.trim="preAuthKeysDialog.acl_tags" multiple allow-create filterable placeholder="Please Choose ACL Tags" style="width:100%">
            <el-option
              v-for="item in preAuthKeysDialog.acl_tags"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancleCreatePreAuthKey">{{ $t('normal.cancel') }}</el-button>
        <el-button size="small" type="primary" @click="createPreAuthKey">{{ $t('normal.ok') }}</el-button>
      </div>
    </el-dialog>
    <!--    Drawer-->
    <el-drawer
      title="PreAuthKey"
      :visible.sync="info.show.drawer"
      :direction="info.show.direction"
    >
      <div>
        {{ $t('console.settings.preAuthKey.key') }}:
        <el-input size="small" :value="info.preAuthKey.key" :label="$t('console.settings.preAuthKey.key')" readonly style="width: 80%">
          <el-button slot="append" icon="el-icon-document-copy" @click="handleCopy(info.preAuthKey.key)" />
        </el-input>
      </div>

      <div>
        {{ $t('console.settings.preAuthKey.used') }}:
        <el-tag size="small" :type="info.preAuthKey.used ? 'success':'danger'">{{ info.preAuthKey.used?$t('normal.yes'):$t('normal.no') }}</el-tag>
      </div>
      <div>
        {{ $t('console.settings.preAuthKey.reUsable') }}:
        <el-tag size="small" :type="info.preAuthKey.reusable ? 'success':'danger'">{{ info.preAuthKey.reusable?$t('normal.yes'):$t('normal.no') }}</el-tag>
      </div>
      <div>
        {{ $t('console.settings.preAuthKey.ephemeral') }}:
        <el-tag size="small" :type="info.preAuthKey.ephemeral ? 'success':'danger'">{{ info.preAuthKey.ephemeral?$t('normal.yes'):$t('normal.no') }}</el-tag>
      </div>
      <div>
        {{ $t('normal.expireTime') }}:
        <el-tag size="small" :type="UtilsDateFormat.fromTimeStamp(info.preAuthKey.expiration).after()?'primary':'danger'">{{ UtilsDateFormat.fromTimeStamp(info.preAuthKey.expiration).toDateTimeString() }}</el-tag>
      </div>
      <div>
        {{ $t('normal.tag') }}:
        <el-select size="small" :value="info.preAuthKey.acl_tags" placeholder="" style="width: 80%" multiple disabled>
          <el-option v-for="tag in info.preAuthKey.acl_tags" :key="tag" :label="tag" :value="tag" />
        </el-select>
      </div>
    </el-drawer>
  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import { createPreAuthKey, expirePreAuthKey, getPreAuthKeys } from '@/api/console/preauthkey'
import './components/mixins/dataFormat'

import { NewPreAuthKey, PreAuthKey } from '@/views/console/setting/components/mixins/dataFormat'
import { UtilsDateFormat } from '@/utils/date'
// import Tab from '@/views/console/setting/components/Tab.vue'
// import Card from '@/views/console/setting/components/Card.vue'
// import CardTab from '@/views/console/setting/components/CardTab.vue'

export default {
  name: 'Setting',
  // components: { CardTab, Card, Tab },
  data() {
    return {
      loading: false,
      tableData: [],
      preAuthKeys: [],
      checkboxes: [],
      notKeys: [],
      preAuthKeysDialog: new NewPreAuthKey(),
      pickerOptions: {
        shortcuts: [{
          text: '2099',
          onClick(picker) {
            // -62135596800
            picker.$emit('pick', new Date(4102415999000))
          }
        }],
        disabledDate(time) {
          return time.getTime() < (Date.now() - 24 * 60 * 60 * 1000)
        }
      },
      preAuthKeyVisible: false,
      info: {
        show: {
          drawer: false,
          direction: 'rtl'
        },
        // eslint-disable-next-line no-undef
        preAuthKey: new PreAuthKey()
      }
    }
  },
  computed: {
    UtilsDateFormat() {
      return UtilsDateFormat
    }
  },
  created() {
    this.getPreAuthKeys()
  },
  methods: {
    async getPreAuthKeys() {
      this.loading = true
      try {
        const { code, data, message } = await getPreAuthKeys()
        if (code !== 200) {
          this.$message.error(message)
          return
        }
        this.preAuthKeys = data
        this.tableData = this.preAuthKeys
      } finally {
        this.loading = false
        this.checkboxes = []
      }
    },
    async createPreAuthKey() {
      // console.debug(this.preAuthKeysDialog)
      if (!this.preAuthKeysDialog.acl_tags.every((str) => str.startsWith('tag:'))) {
        this.$message.error(this.$t('console.settings.preAuthKey.deviceTagMustStartWithTag'))
        return
      }
      const { code, message } = await createPreAuthKey(this.preAuthKeysDialog)
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.preAuthKeyVisible = false
      await this.getPreAuthKeys()
    },
    async expirePreAuthKey(obj) {
      const { code, message } = await expirePreAuthKey({ key: obj.key })
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      await this.getPreAuthKeys()
    },
    filterPreAuthKey(event) {
      if (this.preAuthKeys === null) {
        return
      }
      let used = false
      let expired = false
      for (let i = 0; i < event.length; i++) {
        switch (event[i]) {
          case this.$t('console.settings.preAuthKey.hiddenUsedKeys'):
            used = true
            break
          case this.$t('console.settings.preAuthKey.hiddenExpiredKeys'):
            expired = true
            break
          default:
            this.tableData = this.preAuthKeys
            return
        }
      }
      // console.debug('used is ', used, 'expired is ', expired)
      this.tableData = this.preAuthKeys.filter((item) => ((!used || item.used !== true) && (!expired || UtilsDateFormat.fromTimeStamp(item.expiration).after())))
      // this.preAuthKeys = this.preAuthKeys.filter((item) => (item.used === true || item.reusable === true || item.ephemeral === true) && item.key.includes(trimValue))
    },
    cancleCreatePreAuthKey() {
      this.preAuthKeyVisible = false
    },
    handleClickRow(row, column, event) {
      // console.debug(column.label)
      if (column.label !== 'Operate' && column.label !== undefined) {
        this.info.show.drawer = true
        this.info.preAuthKey = row
      }
    },
    handleCopy(text) {
      if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        window.clipboardData.setData('Text', text)
        this.$message.success(this.$t('console.settings.preAuthKey.copySucceeded'))
      } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        var textarea = document.createElement('textarea')
        textarea.textContent = text
        textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea)
        textarea.select()
        try {
          document.execCommand('copy') // Security exception may be thrown by some browsers.
          this.$message.success(this.$t('console.settings.preAuthKey.copySucceeded'))
        } catch (ex) {
          console.warn('Copy to clipboard failed.', ex)
          this.$message.error(this.$t('console.settings.preAuthKey.copyFailed'))
          return false
        } finally {
          document.body.removeChild(textarea)
        }
      }
    }
  }
}
</script>

<style scoped>
  section > div {
    margin: 15px;
  }
</style>
